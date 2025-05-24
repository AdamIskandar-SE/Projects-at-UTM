// Security and routing management
// ttms.js

// Check if user is logged in - if not, redirect to login page
function checkAuthentication() {
    if (localStorage.getItem("web.fc.utm.my_userSession") == null) {
        console.log("Authentication required. Redirecting to login page.");
        window.location.replace("ttms-login.html");
        return false;
    }
    return true;
}

// Utility function to safely parse JSON from localStorage
function getLocalStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error(`Error parsing localStorage item ${key}:`, e);
        return defaultValue;
    }
}

// Get current user session data
function getCurrentUser() {
    return getLocalStorageItem("web.fc.utm.my_userSession");
}

// Get current session-semester information
function getCurrentSemester() {
    return getLocalStorageItem("web.fc.utm.my_sessemCurr");
}

// Format date in a more user-friendly format
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // If parsing fails, return the original string
        return dateString;
    }
    
    return date.toLocaleDateString('en-MY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Handle API errors consistently
function handleApiError(error, message = "API request failed") {
    console.error(message, error);
    alert(`${message}: ${error.message || error}`);
}

// Fetch data from TTMS API
async function fetchFromApi(endpoint, params = {}) {
    try {
        let url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=${endpoint}`;
        
        // Add any additional parameters
        for (const [key, value] of Object.entries(params)) {
            url += `&${key}=${encodeURIComponent(value)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        handleApiError(error, `Failed to fetch ${endpoint} data`);
        throw error;
    }
}

// Execute on all pages that require authentication
checkAuthentication();