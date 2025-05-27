// src/controller/TimetableController.js
import TimetableService from '../services/TimetableService.js';

class TimetableController {
  constructor() {
    this.timetableService = new TimetableService();
  }

  // Get complete timetable
  async getTimetable() {
    try {
      const timetable = await this.timetableService.getTimetable();
      return {
        success: true,
        data: timetable,
        message: 'Timetable retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve timetable'
      };
    }
  }

  // Get timetable for specific day
  async getTimetableByDay(day) {
    try {
      const dayTimetable = await this.timetableService.getTimetableByDay(day);
      return {
        success: true,
        data: dayTimetable,
        message: `${day} timetable retrieved successfully`
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || `Failed to retrieve ${day} timetable`
      };
    }
  }

  // Get today's schedule
  async getTodaySchedule() {
    try {
      const today = this.getCurrentDay();
      const todaySchedule = await this.timetableService.getTimetableByDay(today);
      return {
        success: true,
        data: todaySchedule,
        message: "Today's schedule retrieved successfully"
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || "Failed to retrieve today's schedule"
      };
    }
  }

  // Get next class information
  async getNextClass() {
    try {
      const nextClass = await this.timetableService.getNextClass();
      return {
        success: true,
        data: nextClass,
        message: 'Next class information retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve next class information'
      };
    }
  }

  // Check for schedule conflicts
  async checkConflicts(newClass) {
    try {
      const conflicts = await this.timetableService.checkScheduleConflicts(newClass);
      return {
        success: true,
        data: conflicts,
        message: conflicts.length > 0 ? 'Schedule conflicts found' : 'No conflicts found'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to check conflicts'
      };
    }
  }

  // Get weekly summary
  async getWeeklySummary() {
    try {
      const summary = await this.timetableService.getWeeklySummary();
      return {
        success: true,
        data: summary,
        message: 'Weekly summary retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve weekly summary'
      };
    }
  }

  // Helper method to get current day
  getCurrentDay() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    return days[today];
  }

  // Get formatted timetable for display
  async getFormattedTimetable() {
    try {
      const formattedTimetable = await this.timetableService.getFormattedTimetable();
      return {
        success: true,
        data: formattedTimetable,
        message: 'Formatted timetable retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to retrieve formatted timetable'
      };
    }
  }
}

export default TimetableController;