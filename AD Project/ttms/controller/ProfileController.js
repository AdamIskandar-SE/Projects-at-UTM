// ProfileController.js
class ProfileController {
    constructor() {
        this.mockSemesters = [
            { sesi: '2024/2025', semester: '2' },
            { sesi: '2024/2025', semester: '1' },
            { sesi: '2023/2024', semester: '2' }
        ];
    }

    async loadSemesters() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.mockSemesters;
    }

    updateProfile(userData, updates) {
        // In a real app, this would make an API call to update user profile
        return { ...userData, ...updates };
    }

    getUserInitials(fullName) {
        if (!fullName) return '?';
        return fullName.split(' ')
            .map(word => word.charAt(0))
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    validateProfileData(profileData) {
        const errors = [];
        
        if (!profileData.full_name || profileData.full_name.trim().length === 0) {
            errors.push('Full name is required');
        }
        
        if (!profileData.login_name || profileData.login_name.trim().length === 0) {
            errors.push('Login name is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    formatUserType(description) {
        if (!description) return 'N/A';
        
        const typeMap = {
            'Pelajar FSKSM': 'Student',
            'Pensyarah': 'Lecturer',
            'Profesor': 'Professor',
            'Pensyarah Kanan': 'Senior Lecturer'
        };
        
        return typeMap[description] || description;
    }
}