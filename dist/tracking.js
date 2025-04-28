(function initializeTracking() {
  console.log('Starting tracking initialization...');
  
  // Function to send tracking data
  function callback(response) {
    console.log("reply", response);
  }

  function sendTrackingData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
    };
    var currentUrl = window.location.href;
    xhr.open("POST", "https://ipapi.optiryte.com/api/IP?Token=KACLOHTYOB", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(currentUrl);
  }

  // Check if document is ready
  if (/in/.test(document.readyState)) {
    setTimeout(function() { sendTrackingData(); }, 9);
  } else {
    sendTrackingData();
  }
})();
