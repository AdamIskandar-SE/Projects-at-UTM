// AuthController.js
class AuthController {
    constructor(app) {
        this.app = app;
        this.mockUsers = {
            'student1': { 
                password: 'pass123',
                data: {
                    full_name: 'Ahmad bin Abdullah',
                    login_name: 'student1',
                    description: 'Pelajar FSKSM',
                    no_matrik: 'A20EC1234'
                }
            },
            'lecturer1': {
                password: 'pass123',
                data: {
                    full_name: 'Dr. Siti Aminah',
                    login_name: 'lecturer1',
                    description: 'Pensyarah',
                    no_pekerja: '12345'
                }
            }
        };
    }

    async handleLogin(username, password) {
        if (!username || !password) {
            throw new Error('Please fill in all fields');
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockUser = this.mockUsers[username];
        if (mockUser && mockUser.password === password) {
            return mockUser.data;
        } else {
            throw new Error('Invalid username or password');
        }
    }

    logout() {
        // Clear any stored session data
        // In a real app, you would clear tokens, sessions, etc.
        return true;
    }

    validateSession() {
        // In a real app, validate current session/token
        return false;
    }
}