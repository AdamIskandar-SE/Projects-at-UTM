// Application Constants
export const APP_NAME = 'UTM Timetable Management System';
export const APP_VERSION = '1.0.0';
export const FACULTY_NAME = 'Faculty of Computing';
export const UNIVERSITY_NAME = 'Universiti Teknologi Malaysia';

// API Endpoints
export const API_BASE_URL = '/api';
export const ENDPOINTS = {
  COURSES: '/courses',
  TIMETABLES: '/timetables',
  STUDENTS: '/students',
  SESSIONS: '/sessions',
  AUTH: '/auth'
};

// Time Constants
export const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM'
];

export const DAYS_OF_WEEK = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri'
];

export const FULL_DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];

// Course Constants
export const COURSE_TYPES = {
  LECTURE: 'Lecture',
  LAB: 'Lab',
  TUTORIAL: 'Tutorial'
};

export const CREDIT_HOURS = [1, 2, 3, 4];

// Venue Constants
export const VENUE_TYPES = {
  LECTURE_HALL: 'Lecture Hall',
  COMPUTER_LAB: 'Computer Lab',
  CLASSROOM: 'Classroom',
  LABORATORY: 'Laboratory'
};

// Status Constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed'
};

// Color Schemes for Courses
export const COURSE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
];

// Validation Rules
export const VALIDATION_RULES = {
  COURSE_CODE: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 12,
    PATTERN: /^[A-Z]{4}\d{4}$/
  },
  STUDENT_ID: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 50
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'utm_user_token',
  USER_DATA: 'utm_user_data',
  TIMETABLE_CACHE: 'utm_timetable_cache',
  THEME_PREFERENCE: 'utm_theme_preference'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please try again.',
  AUTH_FAILED: 'Authentication failed. Please check your credentials.',
  DATA_NOT_FOUND: 'Requested data not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  DATA_SAVED: 'Data saved successfully!',
  TIMETABLE_UPDATED: 'Timetable updated successfully!'
};