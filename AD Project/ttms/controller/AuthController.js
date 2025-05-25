// Authentication Controller
class AuthController {
    constructor() {
        this.initializeLogin();
    }

    initializeLogin() {
        setTimeout(() => {
            const loginBtn = document.getElementById('loginBtn');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const errorDiv = document.getElementById('errorMsg');
            const loadingDiv = document.getElementById('loading');

            if (loginBtn) {
                loginBtn.addEventListener('click', () => this.handleLogin());
            }

            if (passwordInput) {
                passwordInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleLogin();
                    }
                });
            }
        }, 100);
    }

    async handleLogin() {
        const username = document.getElementById('username')?.value.trim();
        const password = document.getElementById('password')?.value.trim();
        const errorDiv = document.getElementById('errorMsg');
        const loadingDiv = document.getElementById('loading');
        const loginBtn = document.getElementById('loginBtn');

        // Validation
        if (!username || !password) {
            this.showError('Please enter both username and password');
            return;
        }

        // Show loading
        loginBtn.disabled = true;
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';

        try {
            const userData = await User.authenticate(username, password);
            
            // Fetch semester data
            await this.fetchSemesterData();
            
            // Dispatch login success event
            window.dispatchEvent(new CustomEvent('loginSuccess', { 
                detail: userData 
            }));

        } catch (error) {
            this.showError('Login failed: ' + error.message);
            loginBtn.disabled = false;
            loadingDiv.style.display = 'none';
        }
    }

    async fetchSemesterData() {
        try {
            const semesters = await Api.getSemesters();
            User.setSemesterList(semesters);
            if (semesters.length > 0) {
                User.setCurrentSemester(semesters[0]);
            }
        } catch (error) {
            console.warn('Could not fetch semester data:', error);
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMsg');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
}