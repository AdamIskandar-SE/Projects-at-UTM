// User Model
class User {
    static getCurrentUser() {
        try {
            const userData = localStorage.getItem('ttms_user_session');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    }

    static setCurrentUser(userData) {
        try {
            localStorage.setItem('ttms_user_session', JSON.stringify(userData));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    static logout() {
        localStorage.removeItem('ttms_user_session');
        localStorage.removeItem('ttms_user_courses');
        localStorage.removeItem('ttms_semester_list');
        localStorage.removeItem('ttms_current_semester');
    }

    static async authenticate(username, password) {
        try {
            const response = await Api.post('authentication', {
                login: username,
                password: password
            });

            if (response && response.length > 0) {
                const userData = response[0];
                this.setCurrentUser(userData);
                return userData;
            }
            throw new Error('Invalid credentials');
        } catch (error) {
            throw error;
        }
    }

    static getCurrentSemester() {
        try {
            const semesterData = localStorage.getItem('ttms_current_semester');
            return semesterData ? JSON.parse(semesterData) : null;
        } catch (error) {
            console.error('Error getting semester data:', error);
            return null;
        }
    }

    static setCurrentSemester(semesterData) {
        try {
            localStorage.setItem('ttms_current_semester', JSON.stringify(semesterData));
        } catch (error) {
            console.error('Error saving semester data:', error);
        }
    }

    static getSemesterList() {
        try {
            const semesterList = localStorage.getItem('ttms_semester_list');
            return semesterList ? JSON.parse(semesterList) : [];
        } catch (error) {
            console.error('Error getting semester list:', error);
            return [];
        }
    }

    static setSemesterList(semesterList) {
        try {
            localStorage.setItem('ttms_semester_list', JSON.stringify(semesterList));
        } catch (error) {
            console.error('Error saving semester list:', error);
        }
    }
}