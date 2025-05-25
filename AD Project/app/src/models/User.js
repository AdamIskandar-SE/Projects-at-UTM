// app/src/models/User.js
class User {
    static getCurrentUser() {
        const userData = localStorage.getItem("web.fc.utm.my_userSession");
        return userData ? JSON.parse(userData) : null;
    }

    static getUserInitials(fullName) {
        if (!fullName) return "?";
        return fullName
            .split(' ')
            .map(word => word.charAt(0))
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    static isStudent() {
        const user = this.getCurrentUser();
        return user && user.description === "Pelajar FSKSM";
    }

    static isLecturer() {
        const user = this.getCurrentUser();
        return user && user.description === "Pensyarah";
    }
}