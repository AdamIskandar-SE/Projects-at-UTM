// API Model
class Api {
    static baseUrl = 'http://web.fc.utm.my/ttms/web_man_webservice_json.cgi';

    static async get(entity, params = {}) {
        try {
            let url = `${this.baseUrl}?entity=${entity}`;
            
            // Add parameters
            Object.keys(params).forEach(key => {
                url += `&${key}=${encodeURIComponent(params[key])}`;
            });

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API GET error:', error);
            throw error;
        }
    }

    static async post(entity, params = {}) {
        // For this API, we use GET with parameters
        return this.get(entity, params);
    }

    static async getSemesters() {
        return this.get('sesisemester');
    }

    static async getStudentCourses(studentId, session, semester) {
        return this.get('pelajar_subjek', {
            no_matrik: studentId,
            sesi: session,
            semester: semester
        });
    }

    static async getStudentTimetable(studentId, session, semester) {
        return this.get('pelajar_jadual', {
            no_matrik: studentId,
            sesi: session,
            semester: semester
        });
    }

    static async getLecturerCourses(lecturerId, session, semester) {
        return this.get('pensyarah_subjek', {
            no_pekerja: lecturerId,
            sesi: session,
            semester: semester
        });
    }

    static async getLecturerTimetable(lecturerId, session, semester) {
        return this.get('pensyarah_jadual', {
            no_pekerja: lecturerId,
            sesi: session,
            semester: semester
        });
    }
}