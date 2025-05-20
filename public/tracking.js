(function initializeTracking() {
  console.log('Starting tracking initialization...');
  
  // Function to check for user consent
  function hasUserConsent() {
    return localStorage.getItem('analytics-consent') === 'true';
  }
  
  // Function to send tracking data
  function callback(response) {
    if (process.env.NODE_ENV === 'development') {
      console.log("Tracking response received");
    }
  }

  function sendTrackingData() {
    // Don't track if user hasn't given consent
    if (!hasUserConsent()) {
      return;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
    };
    
    try {
      // Strip query parameters from URL to avoid sending sensitive data
      var urlObj = new URL(window.location.href);
      var baseUrl = urlObj.origin + urlObj.pathname;
      
      // Get API token from environment variable or use a proxy endpoint
      // This is a placeholder - actual implementation should use environment variables
      // or a server proxy to avoid exposing the token
      var apiEndpoint = "/api/tracking-proxy"; // Server-side proxy endpoint
      
      xhr.open("POST", apiEndpoint, true);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify({ url: baseUrl }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Tracking error:", error);
      }
    }
  }

  // Check if document is ready
  if (/in/.test(document.readyState)) {
    setTimeout(function() { sendTrackingData(); }, 9);
  } else {
    sendTrackingData();
  }
})();