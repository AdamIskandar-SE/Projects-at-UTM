import { COURSE_COLORS } from './constants.js';

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format time to 12-hour format
 * @param {string} time - Time in 24-hour format
 * @returns {string} Time in 12-hour format
 */
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

/**
 * Get color for course based on course code
 * @param {string} courseCode - Course code
 * @returns {string} Hex color code
 */
export const getCourseColor = (courseCode) => {
  const hash = courseCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COURSE_COLORS[hash % COURSE_COLORS.length];
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Capitalize first letter of each word
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Extract section number from course code
 * @param {string} courseCode - Full course code with section
 * @returns {string} Section number
 */
export const extractSection = (courseCode) => {
  const match = courseCode.match(/- (\d+)$/);
  return match ? match[1] : '01';
};

/**
 * Extract base course code without section
 * @param {string} courseCode - Full course code with section
 * @returns {string} Base course code
 */
export const extractCourseCode = (courseCode) => {
  return courseCode.split(' - ')[0];
};

/**
 * Check if two time slots overlap
 * @param {string} time1 - First time slot
 * @param {string} time2 - Second time slot
 * @returns {boolean} True if overlapping
 */
export const isTimeOverlap = (time1, time2) => {
  const parseTime = (timeStr) => {
    const [start, end] = timeStr.split(' - ');
    return {
      start: convertTo24Hour(start),
      end: convertTo24Hour(end)
    };
  };

  const slot1 = parseTime(time1);
  const slot2 = parseTime(time2);

  return slot1.start < slot2.end && slot2.start < slot1.end;
};

/**
 * Convert 12-hour time to 24-hour format
 * @param {string} time12h - Time in 12-hour format
 * @returns {string} Time in 24-hour format
 */
export const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = modifier === 'AM' ? '00' : '12';
  } else if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  
  return `${hours.padStart(2, '0')}:${minutes}`;
};

/**
 * Sort courses by time
 * @param {Array} courses - Array of course objects
 * @returns {Array} Sorted courses
 */
export const sortCoursesByTime = (courses) => {
  return courses.sort((a, b) => {
    const timeA = convertTo24Hour(a.time.split(' - ')[0]);
    const timeB = convertTo24Hour(b.time.split(' - ')[0]);
    return timeA.localeCompare(timeB);
  });
};

/**
 * Calculate total credit hours
 * @param {Array} courses - Array of course objects
 * @returns {number} Total credit hours
 */
export const calculateTotalCredits = (courses) => {
  return courses.reduce((total, course) => total + (course.credit || 0), 0);
};

/**
 * Group courses by day
 * @param {Array} courses - Array of course objects with day property
 * @returns {Object} Courses grouped by day
 */
export const groupCoursesByDay = (courses) => {
  return courses.reduce((acc, course) => {
    const day = course.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(course);
    return acc;
  }, {});
};

/**
 * Check if course is lab based on course code or name
 * @param {Object} course - Course object
 * @returns {boolean} True if lab course
 */
export const isLabCourse = (course) => {
  const code = course.code || course.courseName || '';
  const name = course.name || course.courseName || '';
  return code.includes('J') || name.toLowerCase().includes('lab');
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Generate academic session string
 * @param {Date} startDate - Session start date
 * @returns {string} Academic session string
 */
export const generateSessionString = (startDate = new Date()) => {
  const year = startDate.getFullYear();
  return `Session ${year}/${year + 1}`;
};