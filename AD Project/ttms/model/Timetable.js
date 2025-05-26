// Timetable.js - Timetable Model
class Timetable {
    constructor(data = {}) {
        this.id = data.id || null;
        this.kod_subjek = data.kod_subjek || '';
        this.nama_subjek = data.nama_subjek || '';
        this.hari = data.hari || '';
        this.masa_mula = data.masa_mula || '';
        this.masa_tamat = data.masa_tamat || '';
        this.no_bilik = data.no_bilik || '';
        this.jenis = data.jenis || '';
        this.pensyarah = data.pensyarah || '';
        this.sesi = data.sesi || '';
        this.semester = data.semester || '';
        this.user_id = data.user_id || null;
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

        if (!this.hari || !this.isValidDay(this.hari)) {
            errors.push('Valid day is required');
        }

        if (!this.masa_mula || !this.isValidTime(this.masa_mula)) {
            errors.push('Valid start time is required');
        }

        if (!this.masa_tamat || !this.isValidTime(this.masa_tamat)) {
            errors.push('Valid end time is required');
        }

        if (!this.no_bilik || this.no_bilik.trim().length === 0) {
            errors.push('Room number is required');
        }

        if (!this.jenis || this.jenis.trim().length === 0) {
            errors.push('Class type is required');
        }

        // Check if end time is after start time
        if (this.masa_mula && this.masa_tamat) {
            if (this.timeToMinutes(this.masa_tamat) <= this.timeToMinutes(this.masa_mula)) {
                errors.push('End time must be after start time');
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Utility methods
    isValidDay(day) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return validDays.includes(day);
    }

    isValidTime(timeStr) {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(timeStr);
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    getDuration() {
        if (!this.masa_mula || !this.masa_tamat) return 0;
        return this.timeToMinutes(this.masa_tamat) - this.timeToMinutes(this.masa_mula);
    }

    getDurationInHours() {
        return this.getDuration() / 60;
    }

    getFormattedDuration() {
        const duration = this.getDuration();
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        
        if (hours === 0) return `${minutes}m`;
        if (minutes === 0) return `${hours}h`;
        return `${hours}h ${minutes}m`;
    }

    getTimeRange() {
        return `${this.masa_mula} - ${this.masa_tamat}`;
    }

    getClassType() {
        const type = this.jenis.toLowerCase();
        if (type.includes('lecture') || type.includes('kuliah')) return 'lecture';
        if (type.includes('tutorial') || type.includes('tut')) return 'tutorial';
        if (type.includes('lab') || type.includes('praktikum')) return 'lab';
        return 'other';
    }

    getDisplayName() {
        return `${this.kod_subjek} - ${this.nama_subjek}`;
    }

    getFullDetails() {
        return {
            course: this.getDisplayName(),
            time: this.getTimeRange(),
            duration: this.getFormattedDuration(),
            room: this.no_bilik,
            type: this.jenis,
            day: this.hari,
            lecturer: this.pensyarah
        };
    }

    // Check for time conflicts
    conflictsWith(otherTimetable) {
        if (this.hari !== otherTimetable.hari) return false;
        
        const thisStart = this.timeToMinutes(this.masa_mula);
        const thisEnd = this.timeToMinutes(this.masa_tamat);
        const otherStart = this.timeToMinutes(otherTimetable.masa_mula);
        const otherEnd = this.timeToMinutes(otherTimetable.masa_tamat);
        
        return !(thisEnd <= otherStart || thisStart >= otherEnd);
    }

    // Static methods
    static fromJson(json) {
        return new Timetable(json);
    }

    static fromArray(jsonArray) {
        return jsonArray.map(item => new Timetable(item));
    }

    // Convert to JSON
    toJson() {
        return {
            id: this.id,
            kod_subjek: this.kod_subjek,
            nama_subjek: this.nama_subjek,
            hari: this.hari,
            masa_mula: this.masa_mula,
            masa_tamat: this.masa_tamat,
            no_bilik: this.no_bilik,
            jenis: this.jenis,
            pensyarah: this.pensyarah,
            sesi: this.sesi,
            semester: this.semester,
            user_id: this.user_id,
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
        return new Timetable(this.toJson());
    }
}