import { VALIDATION_RULES } from './constants.js';

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? '' : 'Please enter a valid email address'
  };
};

/**
 * Validate password strength
 * @param {string} password - Password string
 * @returns {Object} Validation result with strength level
 */
export const validatePassword = (password) => {
  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.PASSWORD;
  
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
      strength: 'none'
    };
  }
  
  if (password.length < MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MIN_LENGTH} characters long`,
      strength: 'weak'
    };
  }
  
  if (password.length > MAX_LENGTH) {
    return {
      isValid: false,
      message: `Password must not exceed ${MAX_LENGTH} characters`,
      strength: 'weak'
    };
  }
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  let strength = 'weak';
  let strengthScore = 0;
  
  if (hasLower) strengthScore++;
  if (hasUpper) strengthScore++;
  if (hasDigit) strengthScore++;
  if (hasSpecial) strengthScore++;
  
  if (strengthScore >= 3) strength = 'strong';
  else if (strengthScore >= 2) strength = 'medium';
  
  return {
    isValid: strengthScore >= 2,
    message: strengthScore >= 2 ? '' : 'Password should contain uppercase, lowercase, and numbers',
    strength,
    score: strengthScore
  };
};

/**
 * Validate course code format
 * @param {string} courseCode - Course code
 * @returns {Object} Validation result
 */
export const validateCourseCode = (courseCode) => {
  if (!courseCode) {
    return {
      isValid: false,
      message: 'Course code is required'
    };
  }
  
  const baseCode = courseCode.split(' - ')[0];
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.COURSE_CODE;
  
  if (baseCode.length < MIN_LENGTH || baseCode.length > MAX_LENGTH) {
    return {
      isValid: false,
      message: `Course code must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`
    };
  }
  
  if (!PATTERN.test(baseCode)) {
    return {
      isValid: false,
      message: 'Course code must follow format: ABCD1234'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validate student ID format
 * @param {string} studentId - Student ID
 * @returns {Object} Validation result
 */
export const validateStudentId = (studentId) => {
  if (!studentId) {
    return {
      isValid: false,
      message: 'Student ID is required'
    };
  }
  
  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.STUDENT_ID;
  
  if (studentId.length < MIN_LENGTH || studentId.length > MAX_LENGTH) {
    return {
      isValid: false,
      message: `Student ID must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`
    };
  }
  
  // Check if contains only alphanumeric characters
  if (!/^[A-Za-z0-9]+$/.test(studentId)) {
    return {
      isValid: false,
      message: 'Student ID can only contain letters and numbers'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validate required field
 * @param {any} value - Field value
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName = 'Field') => {
  const isEmpty = value === null || value === undefined || 
                  (typeof value === 'string' && value.trim() === '') ||
                  (Array.isArray(value) && value.length === 0);
  
  return {
    isValid: !isEmpty,
    message: isEmpty ? `${fieldName} is required` : ''
  };
};

/**
 * Validate time format (HH:MM AM/PM)
 * @param {string} time - Time string
 * @returns {Object} Validation result
 */
export const validateTimeFormat = (time) => {
  if (!time) {
    return {
      isValid: false,
      message: 'Time is required'
    };
  }
  
  const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)$/i;
  
  return {
    isValid: timeRegex.test(time),
    message: timeRegex.test(time) ? '' : 'Please enter time in format: HH:MM AM/PM'
  };
};

/**
 * Validate time range
 * @param {string} startTime - Start time
 * @param {string} endTime - End time
 * @returns {Object} Validation result
 */
export const validateTimeRange = (startTime, endTime) => {
  const startValidation = validateTimeFormat(startTime);
  const endValidation = validateTimeFormat(endTime);
  
  if (!startValidation.isValid) {
    return {
      isValid: false,
      message: `Start time: ${startValidation.message}`
    };
  }
  
  if (!endValidation.isValid) {
    return {
      isValid: false,
      message: `End time: ${endValidation.message}`
    };
  }
  
  // Convert to 24-hour format for comparison
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = modifier.toUpperCase() === 'AM' ? '00' : '12';
    } else if (modifier.toUpperCase() === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
  };
  
  const start24 = convertTo24Hour(startTime);
  const end24 = convertTo24Hour(endTime);
  
  if (start24 >= end24) {
    return {
      isValid: false,
      message: 'End time must be after start time'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validate credit hours
 * @param {number} credits - Credit hours
 * @returns {Object} Validation result
 */
export const validateCreditHours = (credits) => {
  if (credits === null || credits === undefined || credits === '') {
    return {
      isValid: false,
      message: 'Credit hours is required'
    };
  }
  
  const numCredits = Number(credits);
  
  if (isNaN(numCredits)) {
    return {
      isValid: false,
      message: 'Credit hours must be a number'
    };
  }
  
  if (numCredits < 1 || numCredits > 6) {
    return {
      isValid: false,
      message: 'Credit hours must be between 1 and 6'
    };
  }
  
  if (!Number.isInteger(numCredits)) {
    return {
      isValid: false,
      message: 'Credit hours must be a whole number'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validate form with multiple fields
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules for each field
 * @returns {Object} Validation results
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;
  
  for (const [field, validators] of Object.entries(rules)) {
    const value = formData[field];
    
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        errors[field] = result.message;
        isValid = false;
        break; // Stop at first error for this field
      }
    }
  }
  
  return {
    isValid,
    errors
  };
};

/**
 * Validate file upload
 * @param {File} file - File object
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
    required = false
  } = options;
  
  if (!file && required) {
    return {
      isValid: false,
      message: 'File is required'
    };
  }
  
  if (!file && !required) {
    return {
      isValid: true,
      message: ''
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: `File size must be less than ${maxSize / (1024 * 1024)}MB`
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: `File type must be one of: ${allowedTypes.join(', ')}`
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};