// Course Model
class Course {
    static getUserCourses() {
        try {
            const coursesData = localStorage.getItem('ttms_user_courses');
            return coursesData ? JSON.parse(coursesData) : [];
        } catch (error) {
            console.error('Error getting user courses:', error);
            return [];
        }
    }

    static setUserCourses(coursesData) {
        try {
            localStorage.setItem('ttms_user_courses', JSON.stringify(coursesData));
        } catch (error) {
            console.error('Error saving user courses:', error);
        }
    }

    static async fetchUserCourses() {
        const user = User.getCurrentUser();
        const semester = User.getCurrentSemester();
        
        if (!user || !semester) {
            throw new Error('User or semester data not available');
        }

        try {
            let courses;
            if (user.description === 'Pelajar FSKSM') {
                courses = await Api.getStudentCourses(user.login_name, semester.sesi, semester.semester);
            } else if (user.description === 'Pensyarah') {
                courses = await Api.getLecturerCourses(user.no_pekerja, semester.sesi, semester.semester);
            } else {
                throw new Error('Unknown user type');
            }

            this.setUserCourses(courses);
            return courses;
        } catch (error) {
            console.error('Error fetching user courses:', error);
            throw error;
        }
    }

    static groupCoursesBySemester(courses) {
        const grouped = {};
        
        courses.forEach(course => {
            const key = `${course.sesi}-${course.semester}`;
            if (!grouped[key]) {
                grouped[key] = {
                    sessem: key,
                    total: 0,
                    courses: []
                };
            }
            grouped[key].total++;
            grouped[key].courses.push(course);
        });

        return Object.values(grouped).sort((a, b) => {
            // Sort by session-semester (newest first)
            return b.sessem.localeCompare(a.sessem);
        });
    }

    static searchCourses(courses, query) {
        if (!query) return courses;
        
        const searchTerm = query.toLowerCase();
        return courses.filter(course => 
            (course.kod_subjek && course.kod_subjek.toLowerCase().includes(searchTerm)) ||
            (course.nama_subjek && course.nama_subjek.toLowerCase().includes(searchTerm))
        );
    }
}