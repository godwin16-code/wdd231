// thankyou.js - Display submitted form data

document.addEventListener('DOMContentLoaded', () => {
    // Get the URL search parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract form data and display it
    displayFormData(urlParams);
});

function displayFormData(urlParams) {
    // Map of form field names to display element IDs
    const fieldMap = {
        'firstName': 'displayFirstName',
        'lastName': 'displayLastName',
        'email': 'displayEmail',
        'phone': 'displayPhone',
        'businessName': 'displayBusinessName',
        'timestamp': 'displayTimestamp'
    };
    
    // Populate each field from URL parameters
    Object.keys(fieldMap).forEach(paramName => {
        const elementId = fieldMap[paramName];
        const element = document.getElementById(elementId);
        const value = urlParams.get(paramName);
        
        if (element && value) {
            element.textContent = decodeURIComponent(value);
        }
    });
}
