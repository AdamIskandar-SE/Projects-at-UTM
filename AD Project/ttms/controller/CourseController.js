// CourseController.js
class CourseController {
    constructor() {
        this.mockCourses = [
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

    async loadCourses(userId, semester = null) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // In a real app, filter by user and semester
        let courses = this.mockCourses;
        
        if (semester) {
            courses = courses.filter(course => 
                course.sesi === semester.sesi && 
                course.semester === semester.semester
            );
        }

        return courses;
    }

    searchCourses(courses, searchTerm) {
        if (!searchTerm) return courses;
        
        const search = searchTerm.toLowerCase();
        return courses.filter(course => 
            course.kod_subjek.toLowerCase().includes(search) ||
            course.nama_subjek.toLowerCase().includes(search)
        );
    }

    groupCoursesBySession(courses) {
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
        return Object.values(grouped).sort((a, b) => b.sessem.localeCompare(a.sessem));
    }
}