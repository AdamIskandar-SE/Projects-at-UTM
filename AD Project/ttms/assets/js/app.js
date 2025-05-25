// Main Application
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            isAuthenticated: false,
            user: {},
            currentView: 'profile',
            currentViewContent: '',
            loginContent: '',
            currentTime: '',
            sidebarOpen: false
        };
    },

    computed: {
        userInitials() {
            if (!this.user.full_name) return '?';
            return this.user.full_name.split(' ')
                .map(word => word.charAt(0))
                .slice(0, 2)
                .join('')
                .toUpperCase();
        }
    },

    methods: {
        async setView(view) {
            this.currentView = view;
            this.closeSidebar();
            
            try {
                const response = await fetch(`views/${view}.html`);
                this.currentViewContent = await response.text();
                
                // Initialize controller based on view
                setTimeout(() => {
                    switch(view) {
                        case 'profile':
                            new ProfileController();
                            break;
                        case 'timetable':
                            new TimetableController();
                            break;
                        case 'courses':
                            new CourseController();
                            break;
                    }
                }, 100);
            } catch (error) {
                this.currentViewContent = '<p class="w3-text-red">Error loading page</p>';
            }
        },

        async loadLogin() {
            try {
                const response = await fetch('views/login.html');
                this.loginContent = await response.text();
                setTimeout(() => new AuthController(), 100);
            } catch (error) {
                this.loginContent = '<p class="w3-text-red">Error loading login</p>';
            }
        },

        logout() {
            if (confirm('Are you sure you want to logout?')) {
                User.logout();
                this.isAuthenticated = false;
                this.user = {};
                this.loadLogin();
            }
        },

        openSidebar() {
            this.sidebarOpen = true;
            document.getElementById('sidebar').style.display = 'block';
        },

        closeSidebar() {
            this.sidebarOpen = false;
            document.getElementById('sidebar').style.display = 'none';
        },

        updateTime() {
            this.currentTime = new Date().toLocaleTimeString('en-MY', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        },

        checkAuth() {
            const userData = User.getCurrentUser();
            if (userData) {
                this.isAuthenticated = true;
                this.user = userData;
                this.setView('profile');
            } else {
                this.loadLogin();
            }
        }
    },

    mounted() {
        // Update time every second
        setInterval(this.updateTime, 1000);
        this.updateTime();
        
        // Check authentication
        this.checkAuth();
        
        // Close sidebar initially
        this.closeSidebar();
        
        // Listen for login success
        window.addEventListener('loginSuccess', (event) => {
            this.user = event.detail;
            this.isAuthenticated = true;
            this.setView('profile');
        });
    }
});

app.mount('#app');