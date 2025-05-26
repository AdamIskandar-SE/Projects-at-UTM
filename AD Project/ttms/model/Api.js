// API Service for handling HTTP requests
class ApiService {
    constructor() {
        this.baseURL = 'api/'; // Adjust this to your actual API endpoint
        this.token = null;
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
    }

    // Generic HTTP request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add authorization header if token exists
        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint, headers = {}) {
        return this.request(endpoint, {
            method: 'GET',
            headers,
        });
    }

    // POST request
    async post(endpoint, data, headers = {}) {
        return this.request(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
    }

    // PUT request
    async put(endpoint, data, headers = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
    }

    // DELETE request
    async delete(endpoint, headers = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            headers,
        });
    }

    // Authentication endpoints
    async login(credentials) {
        return this.post('auth/login', credentials);
    }

    async logout() {
        return this.post('auth/logout');
    }

    // User endpoints
    async getUserProfile() {
        return this.get('user/profile');
    }

    async updateUserProfile(data) {
        return this.put('user/profile', data);
    }

    // Semester endpoints
    async getSemesters() {
        return this.get('semesters');
    }

    // Timetable endpoints
    async getTimetable(semester = null) {
        const endpoint = semester ? `timetable?semester=${semester}` : 'timetable';
        return this.get(endpoint);
    }

    // Course endpoints
    async getCourses(semester = null) {
        const endpoint = semester ? `courses?semester=${semester}` : 'courses';
        return this.get(endpoint);
    }

    async getCourseDetails(courseId) {
        return this.get(`courses/${courseId}`);
    }
}

// Export singleton instance
const api = new ApiService();