// src/controller/CourseController.js
import CourseService from '../services/CourseService.js';

class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

  // Get all courses for a specific session
  async getCoursesBySession(session) {
    try {
      const courses = await this.courseService.getCoursesBySession(session);
      return {
        success: true,
        data: courses,
        message: 'Courses retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve courses'
      };
    }
  }

  // Get student's enrolled courses
  async getStudentCourses(studentId) {
    try {
      const courses = await this.courseService.getStudentCourses(studentId);
      return {
        success: true,
        data: courses,
        message: 'Student courses retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve student courses'
      };
    }
  }

  // Get course details by course code
  async getCourseDetails(courseCode) {
    try {
      const course = await this.courseService.getCourseByCode(courseCode);
      return {
        success: true,
        data: course,
        message: 'Course details retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Course not found'
      };
    }
  }

  // Get all available sessions
  async getAvailableSessions() {
    try {
      const sessions = await this.courseService.getAvailableSessions();
      return {
        success: true,
        data: sessions,
        message: 'Sessions retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve sessions'
      };
    }
  }

  // Calculate total credits for student
  async getStudentTotalCredits(studentId) {
    try {
      const totalCredits = await this.courseService.calculateTotalCredits(studentId);
      return {
        success: true,
        data: { totalCredits },
        message: 'Total credits calculated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to calculate credits'
      };
    }
  }
}

export default CourseController;