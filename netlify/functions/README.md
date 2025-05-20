# Netlify Serverless Functions

This directory contains serverless functions that run on Netlify to handle secure operations that shouldn't be performed client-side.

## Available Functions

### 1. API Proxy (`api-proxy.js`)

A secure proxy for API requests that keeps sensitive keys and tokens out of client-side code.

**Features:**
- Hides API keys from client-side code
- Rate limiting to prevent abuse
- CORS handling
- Request validation
- Error handling

**Usage Example:**
```javascript
// Client-side code
fetch('/.netlify/functions/api-proxy?path=user/profile', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 2. Form Handler (`form-handler.js`)

Securely processes form submissions with validation, sanitization, and spam protection.

**Features:**
- CSRF protection
- Input validation and sanitization
- Rate limiting
- reCAPTCHA verification (when configured)
- Secure forwarding to external APIs

**Usage Example:**
```javascript
// Client-side code
fetch('/.netlify/functions/form-handler', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({
    formType: 'contact',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello world!',
    timestamp: Date.now()
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Environment Variables

These functions rely on environment variables that should be set in the Netlify dashboard:

- `API_KEY`: For authenticating with backend APIs
- `API_ENDPOINT`: Base URL for API requests
- `FORM_ENDPOINT`: Endpoint for form submission processing
- `FORM_API_KEY`: API key for form processing service
- `RECAPTCHA_SECRET`: Secret key for reCAPTCHA verification
- `CSRF_SECRET`: Secret for generating and validating CSRF tokens
- `ALLOWED_ORIGIN`: Origin allowed for CORS (e.g., https://example.com)

## Development

To test these functions locally:

1. Install the Netlify CLI: `npm install netlify-cli -g`
2. Run the dev server: `netlify dev`

## Dependencies

These functions require the following npm packages:
- `node-fetch`: For making HTTP requests
- `dompurify`: For sanitizing user input
- `jsdom`: Required by DOMPurify for server-side usage