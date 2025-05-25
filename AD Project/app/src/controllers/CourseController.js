// app/src/controllers/CourseController.js
class CourseController {
    fetchUserCourses() {
        const user = User.getCurrentUser();
        let endpoint = '';
        let params = {};
        
        if (User.isStudent()) {
            endpoint = "pelajar_subjek";
            params.no_matrik = user.login_name;
        } else if (User.isLecturer()) {
            endpoint = "pensyarah_subjek";
            params.no_pekerja = user.no_pekerja;
        }
        
        const url = this.buildUrl(endpoint, params);
        
        return fetch(url)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("web.fc.utm.my_userCourses", JSON.stringify(data));
                return data;
            });
    }

    buildUrl(endpoint, params) {
        let url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=${endpoint}`;
        for (const [key, value] of Object.entries(params)) {
            url += `&${key}=${encodeURIComponent(value)}`;
        }
        return url;
    }

    getCoursesBySemester(courses) {
        const groups = {};
        courses.forEach(course => {
            const key = `${course.sesi}-${course.semester}`;
            if (!groups[key]) {
                groups[key] = { sessem: key, total: 0, courses: [] };
            }
            groups[key].total++;
            groups[key].courses.push(course);
        });
        return Object.values(groups);
    }
}