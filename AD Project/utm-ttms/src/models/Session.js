// src/model/Session.js
import { Course } from './Course.js';

export class Session {
  constructor(data = {}) {
    this.name = data.name || '';
    this.courses = data.courses ? data.courses.map(course => Course.fromSessionCourse(course)) : [];
    this.isActive = data.isActive || false;
  }

  // Static methods
  static fromSessionData(sessionName, coursesData) {
    return new Session({
      name: sessionName,
      courses: coursesData,
      isActive: sessionName.includes('2024/2025') // Current session
    });
  }

  // Getter methods
  getName() {
    return this.name;
  }

  getCourses() {
    return this.courses;
  }

  getActiveCourses() {
    return this.courses.filter(course => course.isValid());
  }

  getCourseByCode(courseCode) {
    return this.courses.find(course => 
      course.getCourseCode() === courseCode || 
      course.getFullCode() === courseCode
    );
  }

  // Statistics methods
  getTotalCredits() {
    return this.courses.reduce((total, course) => total + course.credit, 0);
  }

  getCourseCount() {
    return this.courses.length;
  }

  // Search and filter methods
  searchCourses(query) {
    const searchTerm = query.toLowerCase();
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm) ||
      course.code.toLowerCase().includes(searchTerm) ||
      course.lecturer.toLowerCase().includes(searchTerm)
    );
  }

  filterCoursesByLecturer(lecturer) {
    return this.courses.filter(course => 
      course.lecturer.toLowerCase().includes(lecturer.toLowerCase())
    );
  }

  filterCoursesByCredit(minCredit, maxCredit) {
    return this.courses.filter(course => 
      course.credit >= minCredit && course.credit <= maxCredit
    );
  }

  // Validation methods
  isValid() {
    return this.name && this.courses.length > 0;
  }

  // Utility methods
  toJSON() {
    return {
      name: this.name,
      courses: this.courses.map(course => course.toJSON()),
      isActive: this.isActive
    };
  }

  toString() {
    return `${this.name} (${this.courses.length} courses)`;
  }
}