// src/model/User.js
import { Course } from './Course.js';

export class User {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.studentId = data.studentId || '';
    this.faculty = data.faculty || 'Faculty of Computing';
    this.program = data.program || '';
    this.semester = data.semester || '';
    this.enrolledCourses = data.studentCourses ? 
      data.studentCourses.map(course => Course.fromStudentCourse(course)) : 
      (data.enrolledCourses || []);
    this.profilePicture = data.profilePicture || '';
    this.phoneNumber = data.phoneNumber || '';
    this.address = data.address || '';
    this.dateOfBirth = data.dateOfBirth || '';
    this.gender = data.gender || '';
    this.nationality = data.nationality || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  // Static methods
  static fromStudentData(data) {
    return new User({
      name: data.name,
      studentCourses: data.studentCourses
    });
  }

  // Getter methods
  getName() {
    return this.name;
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }

  getLastName() {
    const nameParts = this.name.split(' ');
    return nameParts.length > 1 ? nameParts.slice(-1)[0] : '';
  }

  getInitials() {
    return this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 3);
  }

  getEmail() {
    return this.email;
  }

  getStudentId() {
    return this.studentId;
  }

  getEnrolledCourses() {
    return this.enrolledCourses;
  }

  // Course management methods
  addCourse(course) {
    const existingCourse = this.enrolledCourses.find(c => 
      c.code === course.code || c.id === course.id
    );
    
    if (!existingCourse) {
      this.enrolledCourses.push(course instanceof Course ? course : new Course(course));
      this.updatedAt = new Date().toISOString();
      return true;
    }
    return false; // Course already enrolled
  }

  removeCourse(courseCode) {
    const initialLength = this.enrolledCourses.length;
    this.enrolledCourses = this.enrolledCourses.filter(course => 
      course.code !== courseCode && course.id !== courseCode
    );
    
    if (this.enrolledCourses.length < initialLength) {
      this.updatedAt = new Date().toISOString();
      return true;
    }
    return false; // Course not found
  }

  getCourseByCode(courseCode) {
    return this.enrolledCourses.find(course => 
      course.code === courseCode || course.id === courseCode
    );
  }

  isEnrolledInCourse(courseCode) {
    return this.enrolledCourses.some(course => 
      course.code === courseCode || course.id === courseCode
    );
  }

  // Academic information methods
  getTotalCredits() {
    return this.enrolledCourses.reduce((total, course) => total + course.credit, 0);
  }

  getCourseCount() {
    return this.enrolledCourses.length;
  }

  getCoursesGroupedByCredit() {
    const grouped = {};
    this.enrolledCourses.forEach(course => {
      const credit = course.credit;
      if (!grouped[credit]) {
        grouped[credit] = [];
      }
      grouped[credit].push(course);
    });
    return grouped;
  }

  // Search and filter methods
  searchCourses(query) {
    const searchTerm = query.toLowerCase();
    return this.enrolledCourses.filter(course =>
      course.name.toLowerCase().includes(searchTerm) ||
      course.code.toLowerCase().includes(searchTerm)
    );
  }

  // Profile management methods
  updateProfile(profileData) {
    const allowedFields = [
      'name', 'email', 'phoneNumber', 'address', 'dateOfBirth', 
      'gender', 'nationality', 'program', 'semester'
    ];
    
    let updated = false;
    allowedFields.forEach(field => {
      if (profileData.hasOwnProperty(field) && profileData[field] !== this[field]) {
        this[field] = profileData[field];
        updated = true;
      }
    });
    
    if (updated) {
      this.updatedAt = new Date().toISOString();
    }
    
    return updated;
  }

  updateProfilePicture(pictureUrl) {
    if (pictureUrl !== this.profilePicture) {
      this.profilePicture = pictureUrl;
      this.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  // Validation methods
  isValid() {
    return this.name && this.name.trim().length > 0;
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  validateStudentId() {
    // Assuming UTM student ID format (adjust as needed)
    const studentIdRegex = /^[A-Z]\d{8}$/;
    return studentIdRegex.test(this.studentId);
  }

  validatePhoneNumber() {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(this.phoneNumber);
  }

  // Utility methods
  getAge() {
    if (!this.dateOfBirth) return null;
    
    const birthDate = new Date(this.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  getAccountAge() {
    const created = new Date(this.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      studentId: this.studentId,
      faculty: this.faculty,
      program: this.program,
      semester: this.semester,
      enrolledCourses: this.enrolledCourses.map(course => course.toJSON()),
      profilePicture: this.profilePicture,
      phoneNumber: this.phoneNumber,
      address: this.address,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      nationality: this.nationality,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isActive: this.isActive
    };
  }

  toString() {
    return `${this.name} (${this.studentId}) - ${this.enrolledCourses.length} courses`;
  }
}