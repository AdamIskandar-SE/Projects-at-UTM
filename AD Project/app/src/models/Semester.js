// app/src/models/Semester.js
class Semester {
    static getAll() {
        const data = localStorage.getItem("web.fc.utm.my_sessemList");
        return data ? JSON.parse(data) : [];
    }

    static getCurrent() {
        const data = localStorage.getItem("web.fc.utm.my_sessemCurr");
        return data ? JSON.parse(data) : {};
    }

    static setCurrent(semester) {
        localStorage.setItem("web.fc.utm.my_sessemCurr", JSON.stringify(semester));
    }

    static formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleDateString('en-MY', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}