// src/model/Timetable.js
export class TimetableEntry {
  constructor(data = {}) {
    this.time = data.time || '';
    this.course = data.course || '';
    this.section = data.section || '';
    this.courseName = data.courseName || '';
    this.venue = data.venue || '';
    this.day = data.day || '';
  }

  // Getter methods
  getTimeSlot() {
    return this.time;
  }

  getStartTime() {
    return this.time.split(' - ')[0];
  }

  getEndTime() {
    return this.time.split(' - ')[1];
  }

  getCourseCode() {
    return this.course;
  }

  getFullCourseCode() {
    return `${this.course} - ${this.section}`;
  }

  getDuration() {
    const start = this.parseTime(this.getStartTime());
    const end = this.parseTime(this.getEndTime());
    return end - start; // Duration in minutes
  }

  parseTime(timeString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
  }

  // Validation methods
  isValid() {
    return this.time && this.course && this.courseName && this.venue;
  }

  // Conflict detection
  conflictsWith(otherEntry) {
    if (this.day !== otherEntry.day) return false;
    
    const thisStart = this.parseTime(this.getStartTime());
    const thisEnd = this.parseTime(this.getEndTime());
    const otherStart = otherEntry.parseTime(otherEntry.getStartTime());
    const otherEnd = otherEntry.parseTime(otherEntry.getEndTime());
    
    return (thisStart < otherEnd && thisEnd > otherStart);
  }

  // Utility methods
  toJSON() {
    return {
      time: this.time,
      course: this.course,
      section: this.section,
      courseName: this.courseName,
      venue: this.venue,
      day: this.day
    };
  }
}

export class Timetable {
  constructor(data = {}) {
    this.days = {};
    this.initializeDays();
    
    if (data) {
      this.loadFromData(data);
    }
  }

  initializeDays() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    weekDays.forEach(day => {
      this.days[day] = [];
    });
  }

  loadFromData(data) {
    Object.keys(data).forEach(day => {
      if (this.days.hasOwnProperty(day)) {
        this.days[day] = data[day].map(entry => {
          const timetableEntry = new TimetableEntry(entry);
          timetableEntry.day = day;
          return timetableEntry;
        });
      }
    });
  }

  // Getter methods
  getDaySchedule(day) {
    return this.days[day] || [];
  }

  getAllEntries() {
    const allEntries = [];
    Object.keys(this.days).forEach(day => {
      allEntries.push(...this.days[day]);
    });
    return allEntries;
  }

  getWeekDays() {
    return Object.keys(this.days);
  }

  // Search and filter methods
  findEntriesByCourse(courseCode) {
    return this.getAllEntries().filter(entry => 
      entry.course === courseCode || entry.getFullCourseCode().includes(courseCode)
    );
  }

  findEntriesByVenue(venue) {
    return this.getAllEntries().filter(entry => 
      entry.venue.toLowerCase().includes(venue.toLowerCase())
    );
  }

  findEntriesByTime(timeSlot) {
    return this.getAllEntries().filter(entry => entry.time === timeSlot);
  }

  // Schedule manipulation methods
  addEntry(day, entry) {
    if (this.days.hasOwnProperty(day)) {
      const timetableEntry = new TimetableEntry(entry);
      timetableEntry.day = day;
      
      // Check for conflicts
      const conflicts = this.days[day].filter(existing => 
        existing.conflictsWith(timetableEntry)
      );
      
      if (conflicts.length === 0) {
        this.days[day].push(timetableEntry);
        this.sortDaySchedule(day);
        return true;
      }
      return false; // Conflict detected
    }
    return false;
  }

  removeEntry(day, courseCode) {
    if (this.days.hasOwnProperty(day)) {
      this.days[day] = this.days[day].filter(entry => 
        entry.course !== courseCode
      );
      return true;
    }
    return false;
  }

  sortDaySchedule(day) {
    if (this.days.hasOwnProperty(day)) {
      this.days[day].sort((a, b) => {
        return a.parseTime(a.getStartTime()) - b.parseTime(b.getStartTime());
      });
    }
  }

  // Conflict detection
  detectConflicts() {
    const conflicts = [];
    
    Object.keys(this.days).forEach(day => {
      const dayEntries = this.days[day];
      for (let i = 0; i < dayEntries.length; i++) {
        for (let j = i + 1; j < dayEntries.length; j++) {
          if (dayEntries[i].conflictsWith(dayEntries[j])) {
            conflicts.push({
              day: day,
              entry1: dayEntries[i],
              entry2: dayEntries[j]
            });
          }
        }
      }
    });
    
    return conflicts;
  }

  // Statistics methods
  getTotalClassHours() {
    return this.getAllEntries().reduce((total, entry) => {
      return total + (entry.getDuration() / 60); // Convert to hours
    }, 0);
  }

  getClassesPerDay() {
    const classesPerDay = {};
    Object.keys(this.days).forEach(day => {
      classesPerDay[day] = this.days[day].length;
    });
    return classesPerDay;
  }

  getBusiestDay() {
    const classesPerDay = this.getClassesPerDay();
    return Object.keys(classesPerDay).reduce((a, b) => 
      classesPerDay[a] > classesPerDay[b] ? a : b
    );
  }

  // Utility methods
  toJSON() {
    const jsonData = {};
    Object.keys(this.days).forEach(day => {
      jsonData[day] = this.days[day].map(entry => entry.toJSON());
    });
    return jsonData;
  }

  toString() {
    const totalClasses = this.getAllEntries().length;
    const totalHours = this.getTotalClassHours().toFixed(1);
    return `Timetable: ${totalClasses} classes, ${totalHours} hours/week`;
  }
}