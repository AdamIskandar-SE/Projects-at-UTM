// public/assets/js/utils.js

// Simple utility functions
const Utils = {
    // Get data from localStorage safely
    getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage item ${key}:`, e);
            return defaultValue;
        }
    },

    // Set data to localStorage
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error setting localStorage item ${key}:`, e);
        }
    },

    // Remove from localStorage
    removeStorage(key) {
        localStorage.removeItem(key);
    },

    // Format date
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleDateString('en-MY', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    },

    // Show/hide loading
    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) element.style.display = 'block';
    },

    hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) element.style.display = 'none';
    },

    // Simple API fetch
    async fetchApi(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API fetch error:', error);
            throw error;
        }
    }
};