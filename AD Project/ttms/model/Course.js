// Course.js - Course Model
class Course {
    constructor(data = {}) {
        this.id = data.id || null;
        this.kod_subjek = data.kod_subjek || '';
        this.nama_subjek = data.nama_subjek || '';
        this.kredit_jam = data.kredit_jam || '';
        this.pensyarah = data.pensyarah || '';
        this.sesi = data.sesi || '';
        this.semester = data.semester || '';
        this.description = data.description || '';
        this.prerequisites = data.prerequisites || [];
        this.created_at = data.created_at || new Date();
        this.updated_at = data.updated_at || new Date();
    }

    // Validation methods
    validate() {
        const errors = [];

        if (!this.kod_subjek || this.kod_subjek.trim().length === 0) {
            errors.push('Course code is required');
        }

        if (!this.nama_subjek || this.nama_subjek.trim().length === 0) {
            errors.push('Course name is required');
        }

        if (!this.kredit_jam || isNaN(parseInt(this.kredit_jam))) {
            errors.push('Valid credit hours required');
        }

        if (!this.sesi || this.sesi.trim().length === 0) {
            errors.push('Session is required');
        }

        if (!this.semester || this.semester.trim().length === 0) {
            errors.push('Semester is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Utility methods
    getFullCode() {
        return this.kod_subjek.toUpperCase();
    }

    getDisplayName() {
        return `${this.getFullCode()} - ${this.nama_subjek}`;
    }

    getCreditHours() {
        return parseInt(this.kredit_jam) || 0;
    }

    getSessionSemester() {
        return `${this.sesi} - Semester ${this.semester}`;
    }

    hasPrerequisites() {
        return this.prerequisites && this.prerequisites.length > 0;
    }

    // Static methods
    static fromJson(json) {
        return new Course(json);
    }

    static fromArray(jsonArray) {
        return jsonArray.map(item => new Course(item));
    }

    // Convert to JSON
    toJson() {
        return {
            id: this.id,
            kod_subjek: this.kod_subjek,
            nama_subjek: this.nama_subjek,
            kredit_jam: this.kredit_jam,
            pensyarah: this.pensyarah,
            sesi: this.sesi,
            semester: this.semester,
            description: this.description,
            prerequisites: this.prerequisites,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    // Update method
    update(data) {
        Object.keys(data).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        });
        this.updated_at = new Date();
        return this;
    }

    // Clone method
    clone() {
        return new Course(this.toJson());
    }
}