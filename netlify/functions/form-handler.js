// Netlify serverless function to handle form submissions securely
const fetch = require('node-fetch');
const crypto = require('crypto');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Setup DOMPurify with jsdom window for server-side use
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const sanitize = DOMPurify.sanitize;

// API endpoints and keys would be set as environment variables in Netlify
const FORM_ENDPOINT = process.env.FORM_ENDPOINT || 'https://api.example.com/submit-form';
const API_KEY = process.env.FORM_API_KEY;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

// Allowed form types for validation
const ALLOWED_FORM_TYPES = ['contact', 'lead', 'feedback', 'support'];

// Rate limiting implementation
const RATE_LIMIT = 5; // Max submissions per IP per 5 minutes
const ipSubmissions = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowStart = now - 5 * 60 * 1000; // 5-minute window
  
  if (!ipSubmissions.has(ip)) {
    ipSubmissions.set(ip, [now]);
    return true;
  }
  
  const submissions = ipSubmissions.get(ip).filter(time => time > windowStart);
  submissions.push(now);
  ipSubmissions.set(ip, submissions);
  
  return submissions.length <= RATE_LIMIT;
};

// Generate a CSRF token
const generateCSRFToken = (ip, timestamp) => {
  const secret = process.env.CSRF_SECRET || 'your-csrf-secret';
  return crypto
    .createHmac('sha256', secret)
    .update(`${ip}-${timestamp}`)
    .digest('hex');
};

// Validate CSRF token
const validateCSRFToken = (token, ip, timestamp) => {
  // Check if token is expired (tokens valid for 1 hour)
  const now = Date.now();
  if (now - timestamp > 60 * 60 * 1000) {
    return false;
  }
  
  // Regenerate token to compare
  const expectedToken = generateCSRFToken(ip, timestamp);
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
};

// Verify reCAPTCHA response
const verifyRecaptcha = async (recaptchaResponse) => {
  if (!RECAPTCHA_SECRET) {
    console.warn('reCAPTCHA secret not configured, skipping verification');
    return true;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaResponse}`
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now();
  const windowStart = now - 5 * 60 * 1000;
  
  for (const [ip, times] of ipSubmissions.entries()) {
    const validTimes = times.filter(time => time > windowStart);
    if (validTimes.length === 0) {
      ipSubmissions.delete(ip);
    } else {
      ipSubmissions.set(ip, validTimes);
    }
  }
}, 15 * 60 * 1000); // Clean up every 15 minutes

// Input validation
const validateFormData = (formData) => {
  // Check if form type is allowed
  if (!formData.formType || !ALLOWED_FORM_TYPES.includes(formData.formType)) {
    return { valid: false, error: 'Invalid form type' };
  }
  
  // Check required fields based on form type
  const requiredFields = {
    contact: ['name', 'email', 'message'],
    lead: ['name', 'email', 'company', 'interest'],
    feedback: ['rating', 'comment'],
    support: ['name', 'email', 'subject', 'message']
  };
  
  for (const field of requiredFields[formData.formType]) {
    if (!formData[field] || typeof formData[field] !== 'string' || !formData[field].trim()) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  
  // Validate email format
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Additional field-specific validations could be added here
  
  return { valid: true };
};

// Sanitize form data
const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitize(value.trim());
    } else if (typeof value === 'number') {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitize(item.trim()) : item
      );
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeFormData(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'https://ingeniousdigital.com',
    'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get client IP for rate limiting
    const ip = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'Too many form submissions. Please try again later.' })
      };
    }

    // Parse form data
    let formData;
    try {
      formData = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid form data' })
      };
    }

    // Validate CSRF token
    const csrfToken = event.headers['x-csrf-token'];
    const timestamp = formData.timestamp;
    
    if (!csrfToken || !timestamp || !validateCSRFToken(csrfToken, ip, timestamp)) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired CSRF token' })
      };
    }

    // Verify reCAPTCHA if enabled
    if (RECAPTCHA_SECRET && formData.recaptchaResponse) {
      const recaptchaValid = await verifyRecaptcha(formData.recaptchaResponse);
      if (!recaptchaValid) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'reCAPTCHA verification failed' })
        };
      }
    }

    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: validation.error })
      };
    }

    // Sanitize form data
    const sanitizedFormData = sanitizeFormData(formData);
    
    // Remove sensitive or unnecessary fields
    delete sanitizedFormData.recaptchaResponse;
    delete sanitizedFormData.timestamp;
    
    // Add metadata
    sanitizedFormData.metadata = {
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: event.headers['user-agent'] || 'unknown'
    };

    // Send to the form endpoint
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY ? `Bearer ${API_KEY}` : undefined,
        'X-Request-ID': crypto.randomUUID()
      },
      body: JSON.stringify(sanitizedFormData)
    });

    const responseData = await response.json();
    
    // Return sanitized response
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify({
        success: response.status >= 200 && response.status < 300,
        message: responseData.message || 'Form submitted successfully',
        reference: responseData.reference || crypto.randomBytes(4).toString('hex')
      })
    };
  } catch (error) {
    console.error('Form Handling Error:', error);
    
    // Return a generic error to avoid leaking information
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'An error occurred while processing your form submission',
        reference: crypto.randomBytes(4).toString('hex')
      })
    };
  }
};