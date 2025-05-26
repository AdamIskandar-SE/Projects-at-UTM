// Main App JavaScript - Core functionality
class FCTimetableApp {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.setupEventListeners();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    // Authentication methods
    checkAuthentication() {
        // Check if user is logged in (you can use localStorage, sessionStorage, or cookies)
        const userData = localStorage.getItem('fctt_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.isAuthenticated = true;
            this.updateUserInterface();
        } else {
            // Redirect to login if not authenticated and not on login page
            if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
                window.location.href = 'login.html';
            }
        }
    }

    login(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        localStorage.setItem('fctt_user', JSON.stringify(userData));
        this.updateUserInterface();
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('fctt_user');
        window.location.href = 'login.html';
    }

    // UI Update methods
    updateUserInterface() {
        if (!this.currentUser) return;

        // Update user avatar
        const avatarEl = document.getElementById('user-avatar');
        if (avatarEl) {
            avatarEl.textContent = this.getUserInitials(this.currentUser.full_name);
        }

        // Update user name
        const nameEl = document.getElementById('user-name');
        if (nameEl) {
            nameEl.textContent = this.currentUser.full_name || 'User';
        }

        // Update user description
        const descEl = document.getElementById('user-description');
        if (descEl) {
            descEl.textContent = this.currentUser.description || 'User';
        }

        // Update profile information if on profile page
        this.updateProfileInfo();
    }

    updateProfileInfo() {
        const profileName = document.getElementById('profile-name');
        const profileLogin = document.getElementById('profile-login');
        const profileType = document.getElementById('profile-type');
        const staffIdSection = document.getElementById('staff-id-section');
        const studentIdSection = document.getElementById('student-id-section');
        const profileStaffId = document.getElementById('profile-staff-id');
        const profileStudentId = document.getElementById('profile-student-id');

        if (profileName) profileName.textContent = this.currentUser.full_name || 'N/A';
        if (profileLogin) profileLogin.textContent = this.currentUser.login_name || 'N/A';
        if (profileType) profileType.textContent = this.currentUser.description || 'N/A';

        if (this.currentUser.no_pekerja) {
            if (staffIdSection) staffIdSection.style.display = 'block';
            if (profileStaffId) profileStaffId.textContent = this.currentUser.no_pekerja;
        }

        if (this.currentUser.no_matrik) {
            if (studentIdSection) studentIdSection.style.display = 'block';
            if (profileStudentId) profileStudentId.textContent = this.currentUser.no_matrik;
        }
    }

    getUserInitials(fullName) {
        if (!fullName) return '?';
        return fullName.split(' ')
            .map(word => word.charAt(0))
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    updateTime() {
        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            const now = new Date();
            timeEl.textContent = now.toLocaleTimeString('en-MY', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    }

    // Sidebar methods
    setupEventListeners() {
        // Handle click outside sidebar to close it
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuButton = e.target.closest('.w3-xxlarge');
            
            if (sidebar && sidebar.style.display === 'block' && 
                !sidebar.contains(e.target) && !menuButton) {
                this.closeSidebar();
            }
        });

        // Handle Enter key on login form
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && (e.target.id === 'username' || e.target.id === 'password')) {
                const loginBtn = document.getElementById('login-btn');
                if (loginBtn) loginBtn.click();
            }
        });
    }

    // Utility methods for API calls
    async apiCall(endpoint, options = {}) {
        const baseUrl = 'your-api-base-url'; // Replace with your actual API base URL
        const url = `${baseUrl}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (this.isAuthenticated && this.currentUser) {
            defaultOptions.headers['Authorization'] = `Bearer ${this.currentUser.token || ''}`;
        }

        const finalOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Mock data for development/testing
    getMockSemesters() {
        return [
            { sesi: '2024/2025', semester: '2' },
            { sesi: '2024/2025', semester: '1' },
            { sesi: '2023/2024', semester: '2' }
        ];
    }

    getMockTimetable() {
        return [
            {
                id: 1,
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                hari: 'Monday',
                masa_mula: '09:00',
                masa_tamat: '11:00',
                no_bilik: 'P19-3001',
                jenis: 'lecture'
            },
            {
                id: 2,
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                hari: 'Wednesday',
                masa_mula: '14:00',
                masa_tamat: '16:00',
                no_bilik: 'P19-3001',
                jenis: 'tutorial'
            },
            {
                id: 3,
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Tuesday',
                masa_mula: '10:00',
                masa_tamat: '12:00',
                no_bilik: 'P19-4001',
                jenis: 'lecture'
            },
            {
                id: 4,
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Thursday',
                masa_mula: '15:00',
                masa_tamat: '17:00',
                no_bilik: 'P19-Lab2',
                jenis: 'lab'
            },
            {
                id: 5,
                kod_subjek: 'SECJ2013',
                nama_subjek: 'Object-Oriented Programming',
                hari: 'Friday',
                masa_mula: '11:00',
                masa_tamat: '13:00',
                no_bilik: 'P19-2002',
                jenis: 'lecture'
            },
            {
                id: 6,
                kod_subjek: 'SECJ2013',
                nama_subjek: 'Object-Oriented Programming',
                hari: 'Monday',
                masa_mula: '14:00',
                masa_tamat: '16:00',
                no_bilik: 'P19-Lab1',
                jenis: 'lab'
            }
        ];
    }

    getMockCourses() {
        return [
            {
                id: 1,
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                kredit_jam: '3',
                pensyarah: 'Dr. Ahmad',
                sesi: '2024/2025',
                semester: '2'
            },
            {
                id: 2,
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                kredit_jam: '3',
                pensyarah: 'Dr. Siti',
                sesi: '2024/2025',
                semester: '2'
            },
            {
                id: 3,
                kod_subjek: 'SECI1013',
                nama_subjek: 'Programming Technique I',
                kredit_jam: '4',
                pensyarah: 'Dr. Rahman',
                sesi: '2024/2025',
                semester: '1'
            },
            {
                id: 4,
                kod_subjek: 'SECJ2013',
                nama_subjek: 'Object-Oriented Programming',
                kredit_jam: '4',
                pensyarah: 'Dr. Fatimah',
                sesi: '2024/2025',
                semester: '2'
            }
        ];
    }
}

// Global functions for HTML onclick events
function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
}

function logout() {
    if (window.fcApp) {
        window.fcApp.logout();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.fcApp = new FCTimetableApp();
});

// Utility functions
function showElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'block';
}

function hideElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'none';
}

function showLoading(containerId) {
    hideElement(containerId);
    showElement(containerId + '-loading');
}

function hideLoading(containerId) {
    hideElement(containerId + '-loading');
    showElement(containerId);
}