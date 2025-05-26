// src/model/Course.js
export class Course {
  constructor(data = {}) {
    this.id = data.id || data.code || '';
    this.code = data.code || data.id || '';
    this.name = data.name || data.course_name || '';
    this.credit = data.credit || 0;
    this.lecturer = data.lecturer || data.instructor_name || '';
    this.venue = data.venue || '';
    this.section = data.section || '';
  }

  // Static method to create Course from different data formats
  static fromCourseData(data) {
    return new Course(data);
  }

  static fromStudentCourse(data) {
    return new Course({
      code: data.code,
      name: data.name,
      credit: data.credit
    });
  }

  static fromSessionCourse(data) {
    return new Course({
      code: data.code,
      name: data.name,
      credit: data.credit,
      lecturer: data.lecturer,
      venue: data.venue
    });
  }

  // Getter methods
  getCourseCode() {
    return this.code.split(' - ')[0] || this.code;
  }

  getSectionNumber() {
    return this.code.split(' - ')[1] || this.section;
  }

  getFullCode() {
    return this.code;
  }

  // Validation methods
  isValid() {
    return this.code && this.name;
  }

  // Utility methods
  toJSON() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      credit: this.credit,
      lecturer: this.lecturer,
      venue: this.venue,
      section: this.section
    };
  }

  toString() {
    return `${this.code} - ${this.name}`;
  }
}