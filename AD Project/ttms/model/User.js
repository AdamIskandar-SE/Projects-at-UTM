// User Model
class User {
    constructor(data = {}) {
        this.login_name = data.login_name || '';
        this.full_name = data.full_name || '';
        this.description = data.description || '';
        this.no_matrik = data.no_matrik || null;
        this.no_pekerja = data.no_pekerja || null;
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.faculty = data.faculty || '';
        this.department = data.department || '';
        this.year_of_study = data.year_of_study || null;
        this.program = data.program || '';
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
    }

    // Get user initials for avatar
    getInitials() {
        if (!this.full_name) return '?';
        return this.full_name
            .split(' ')
            .map(word => word.charAt(0))
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    // Check if user is a student
    isStudent() {
        return this.description && this.description.toLowerCase().includes('pelajar');
    }

    // Check if user is a lecturer/staff
    isLecturer() {
        return this.description && (
            this.description.toLowerCase().includes('pensyarah') ||
            this.description.toLowerCase().includes('lecturer') ||
            this.description.toLowerCase().includes('staff')
        );
    }

    // Get user ID (matrik number for students, employee number for staff)
    getUserId() {
        return this.no_matrik || this.no_pekerja || this.login_name;
    }

    // Get user type
    getUserType() {
        if (this.isStudent()) return 'student';
        if (this.isLecturer()) return 'lecturer';
        return 'user';
    }

    // Validate user data
    isValid() {
        return this.login_name && this.full_name;
    }

    // Update user data
    update(data) {
        Object.keys(data).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        });
        this.updated_at = new Date().toISOString();
    }

    // Convert to plain object for API requests
    toObject() {
        return {
            login_name: this.login_name,
            full_name: this.full_name,
            description: this.description,
            no_matrik: this.no_matrik,
            no_pekerja: this.no_pekerja,
            email: this.email,
            phone: this.phone,
            faculty: this.faculty,
            department: this.department,
            year_of_study: this.year_of_study,
            program: this.program
        };
    }

    // Create User instance from API response
    static fromApiResponse(data) {
        return new User(data);
    }
}

// Mock data for demonstration (remove this in production)
const mockUsers = {
    'student1': { 
        password: 'pass123',
        data: {
            full_name: 'Ahmad bin Abdullah',
            login_name: 'student1',
            description: 'Pelajar FSKSM',
            no_matrik: 'A20EC1234',
            email: 'ahmad@graduate.utm.my',
            faculty: 'Faculty of Computing',
            program: 'Bachelor of Computer Science (Software Engineering)',
            year_of_study: 3
        }
    },
    'lecturer1': {
        password: 'pass123',
        data: {
            full_name: 'Dr. Siti Aminah',
            login_name: 'lecturer1',
            description: 'Pensyarah',
            no_pekerja: '12345',
            email: 'sitiaminah@utm.my',
            faculty: 'Faculty of Computing',
            department: 'Software Engineering'
        }
    }
};