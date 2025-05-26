<template>
  <div class="student-courses-container">
    <div class="content-header">
      <h1>My Enrolled Courses</h1>
      <p>Track your academic progress and course information</p>
    </div>
    
    <div class="student-info">
      <div class="student-name">{{ studentData.name }}</div>
      <div class="total-credits">Total Credit Hours: {{ totalCredits }}</div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Enrolled Courses ({{ studentData.studentCourses.length }})</h2>
      <div class="courses-list">
        <div v-for="course in studentData.studentCourses" :key="course.code" class="student-course-card">
          <div class="course-info">
            <h3>{{ course.code }}</h3>
            <p>{{ course.name }}</p>
          </div>
          <div class="credit-info">
            <span class="credit-badge">{{ course.credit }} Credits</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Academic Summary</h2>
      <div class="academic-stats">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <div class="stat-number">{{ studentData.studentCourses.length }}</div>
            <div class="stat-label">Total Courses</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-number">{{ totalCredits }}</div>
            <div class="stat-label">Credit Hours</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <div class="stat-number">{{ averageCredits }}</div>
            <div class="stat-label">Avg Credits/Course</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-number">{{ academicLoad }}</div>
            <div class="stat-label">Academic Load</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentCourseData from '@/data/student_courseData.json'

export default {
  name: 'StudentCourses',
  data() {
    return {
      studentData: studentCourseData
    }
  },
  computed: {
    totalCredits() {
      return this.studentData.studentCourses.reduce((total, course) => total + course.credit, 0)
    },
    averageCredits() {
      const avg = this.totalCredits / this.studentData.studentCourses.length
      return Math.round(avg * 10) / 10
    },
    academicLoad() {
      if (this.totalCredits >= 18) return 'Heavy'
      if (this.totalCredits >= 15) return 'Normal'
      if (this.totalCredits >= 12) return 'Light'
      return 'Part-time'
    }
  }
}
</script>

<style scoped>
.academic-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.stat-card {
  background: var(--white);
  border: 2px solid var(--light-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
}

.stat-card:hover {
  border-color: var(--secondary-color);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>