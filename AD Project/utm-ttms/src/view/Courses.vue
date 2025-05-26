<template>
  <div class="courses-container">
    <div class="content-header">
      <h1>Available Courses</h1>
      <p>Browse courses available for the current academic session</p>
    </div>
    
    <div class="content-card">
      <div class="session-selector">
        <label for="session-select">Select Session:</label>
        <select id="session-select" v-model="selectedSession" @change="loadCourses">
          <option v-for="session in availableSessions" :key="session" :value="session">
            {{ session }}
          </option>
        </select>
      </div>
      
      <div class="courses-grid" v-if="courses.length > 0">
        <div v-for="course in courses" :key="course.code" class="course-card">
          <div class="course-code">{{ course.code }}</div>
          <div class="course-name">{{ course.name }}</div>
          <div class="course-details">
            <div class="course-detail">
              <strong>Credits:</strong> 
              <span class="credit-badge">{{ course.credit }}</span>
            </div>
            <div class="course-detail">
              <strong>Lecturer:</strong> {{ course.lecturer }}
            </div>
            <div class="course-detail">
              <strong>Venue:</strong> {{ course.venue }}
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="no-courses">
        <p>No courses available for the selected session.</p>
      </div>
    </div>
  </div>
</template>

<script>
import sessionCourseData from '@/data/session_courseData.json'

export default {
  name: 'Courses',
  data() {
    return {
      selectedSession: 'Session 2024/2025',
      sessionData: sessionCourseData.sessions,
      courses: []
    }
  },
  computed: {
    availableSessions() {
      return Object.keys(this.sessionData)
    }
  },
  mounted() {
    this.loadCourses()
  },
  methods: {
    loadCourses() {
      this.courses = this.sessionData[this.selectedSession] || []
    }
  }
}
</script>

<style scoped>
.session-selector {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.session-selector label {
  font-weight: 600;
  color: var(--primary-color);
}

.session-selector select {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--white);
  color: var(--text-dark);
  font-size: 1rem;
  min-width: 200px;
}

.session-selector select:focus {
  outline: none;
  border-color: var(--secondary-color);
}

.no-courses {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
  font-size: 1.1rem;
}
</style>