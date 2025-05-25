// app/src/controllers/AuthController.js
class AuthController {
    login(username, password) {
        const url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=authentication&login=${username}&password=${password}`;
        
        return fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    localStorage.setItem("web.fc.utm.my_userSession", JSON.stringify(data[0]));
                    return this.fetchSemesters();
                }
                throw new Error("Invalid credentials");
            });
    }

    fetchSemesters() {
        return fetch("http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester")
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("web.fc.utm.my_sessemList", JSON.stringify(data));
                localStorage.setItem("web.fc.utm.my_sessemCurr", JSON.stringify(data[0]));
            });
    }

    logout() {
        localStorage.removeItem("web.fc.utm.my_userSession");
        localStorage.removeItem("web.fc.utm.my_userCourses");
        localStorage.removeItem("web.fc.utm.my_sessemList");
        localStorage.removeItem("web.fc.utm.my_sessemCurr");
        window.location.replace("index.html");
    }

    isAuthenticated() {
        return localStorage.getItem("web.fc.utm.my_userSession") !== null;
    }
}