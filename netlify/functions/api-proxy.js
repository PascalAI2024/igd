// Netlify serverless function to proxy API requests and handle tokens securely
const fetch = require('node-fetch');
const crypto = require('crypto');

// This would be set as an environment variable in Netlify
// NEVER expose this in client-side code
const API_KEY = process.env.API_KEY;
const API_ENDPOINT = process.env.API_ENDPOINT || 'https://api.example.com';

// Generate a nonce for additional security
const generateNonce = () => {
  return crypto.randomBytes(16).toString('base64');
};

// Basic rate limiting - could be expanded with Redis or other solutions
const RATE_LIMIT = 50; // requests per minute
const ipRequests = new Map();

const rateLimitCheck = (ip) => {
  const now = Date.now();
  const windowStart = now - 60 * 1000; // 1 minute window
  
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, [now]);
    return true;
  }
  
  const requests = ipRequests.get(ip).filter(time => time > windowStart);
  requests.push(now);
  ipRequests.set(ip, requests);
  
  return requests.length <= RATE_LIMIT;
};

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  const windowStart = now - 60 * 1000;
  
  for (const [ip, times] of ipRequests.entries()) {
    const validTimes = times.filter(time => time > windowStart);
    if (validTimes.length === 0) {
      ipRequests.delete(ip);
    } else {
      ipRequests.set(ip, validTimes);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

exports.handler = async (event, context) => {
  // Basic CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'https://ingeniousdigital.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  try {
    // Get client IP for rate limiting
    const ip = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    
    // Check rate limit
    if (!rateLimitCheck(ip)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
      };
    }

    // Only allow POST and GET methods
    if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Parse payload for POST requests
    let payload = {};
    if (event.httpMethod === 'POST') {
      try {
        payload = JSON.parse(event.body);
      } catch (error) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid JSON payload' })
        };
      }
    }

    // Get path from query parameters
    const path = event.queryStringParameters?.path || '';
    if (!path) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing API path' })
      };
    }

    // Construct the request to the actual API
    const requestOptions = {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Request-ID': crypto.randomUUID(),
        'X-Nonce': generateNonce()
      }
    };

    // Add body for POST requests
    if (event.httpMethod === 'POST') {
      requestOptions.body = JSON.stringify(payload);
    }

    // Make the request to the API
    const response = await fetch(`${API_ENDPOINT}/${path}`, requestOptions);
    const data = await response.json();

    // Return the response to the client
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('API Proxy Error:', error);
    
    // Return a generic error to avoid leaking information
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'An error occurred while processing your request' })
    };
  }
};