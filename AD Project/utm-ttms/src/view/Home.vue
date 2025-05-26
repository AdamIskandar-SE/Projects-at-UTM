<template>
  <div class="home-container">
    <!-- Header Section -->
    <div class="hero-section">
      <div class="hero-content">
        <img src="/assets/images/Logo-UTM-white.png" alt="UTM Logo" class="utm-logo">
        <h1 class="hero-title">UTM Faculty of Computing</h1>
        <h2 class="hero-subtitle">Timetable Management System</h2>
        <p class="hero-description">
          Manage your academic schedule efficiently with our comprehensive timetable system
        </p>
      </div>
    </div>

    <!-- Quick Stats Section -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <h3>{{ totalCourses }}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👨‍🎓</div>
          <div class="stat-info">
            <h3>{{ enrolledCourses }}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-info">
            <h3>{{ weeklyClasses }}</h3>
            <p>Weekly Classes</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏛️</div>
          <div class="stat-info">
            <h3>{{ totalCredits }}</h3>
            <p>Total Credits</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="actions-section">
      <h3 class="actions-title">Quick Actions</h3>
      <div class="actions-grid">
        <router-link to="/timetable" class="action-card">
          <div class="action-icon">📊</div>
          <h4>View Timetable</h4>
          <p>Check your weekly schedule</p>
        </router-link>
        <router-link to="/courses" class="action-card">
          <div class="action-icon">📖</div>
          <h4>Browse Courses</h4>
          <p>Explore available courses</p>
        </router-link>
        <router-link to="/student-courses" class="action-card">
          <div class="action-icon">✏️</div>
          <h4>My Courses</h4>
          <p>Manage enrolled courses</p>
        </router-link>
        <router-link to="/profile" class="action-card">
          <div class="action-icon">👤</div>
          <h4>Profile</h4>
          <p>Update your information</p>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="activity-section">
      <h3 class="activity-title">Today's Schedule</h3>
      <div class="activity-list">
        <div v-if="todayClasses.length === 0" class="no-classes">
          <p>No classes scheduled for today</p>
        </div>
        <div v-else>
          <div v-for="classItem in todayClasses" :key="classItem.course + classItem.section" class="class-item">
            <div class="class-time">{{ classItem.time }}</div>
            <div class="class-details">
              <h4>{{ classItem.courseName }}</h4>
              <p>{{ classItem.course }}-{{ classItem.section }} • {{ classItem.venue }}</p>
            </div>
            <div class="class-status">
              <span class="status-badge" :class="getClassStatus(classItem.time)">
                {{ getClassStatus(classItem.time) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      totalCourses: 0,
      enrolledCourses: 0,
      weeklyClasses: 0,
      totalCredits: 0,
      todayClasses: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        // Load session course data
        const sessionResponse = await fetch('/src/data/session_courseData.json')
        const sessionData = await sessionResponse.json()
        const currentSession = sessionData.sessions['Session 2024/2025']
        this.totalCourses = currentSession.length

        // Load student course data
        const studentResponse = await fetch('/src/data/student_courseData.json')
        const studentData = await studentResponse.json()
        this.enrolledCourses = studentData.studentCourses.length
        this.totalCredits = studentData.studentCourses.reduce((sum, course) => sum + course.credit, 0)

        // Load timetable data
        const timetableResponse = await fetch('/src/data/timetableData.json')
        const timetableData = await timetableResponse.json()
        
        // Calculate weekly classes
        this.weeklyClasses = Object.values(timetableData).flat().length

        // Get today's classes
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
        this.todayClasses = timetableData[today] || []
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },
    getClassStatus(timeSlot) {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      
      const [startTime] = timeSlot.split(' - ')
      const [time, period] = startTime.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      
      let classStartTime = hours * 60 + minutes
      if (period === 'PM' && hours !== 12) classStartTime += 12 * 60
      if (period === 'AM' && hours === 12) classStartTime = minutes
      
      if (currentTime < classStartTime - 30) return 'upcoming'
      if (currentTime < classStartTime + 120) return 'ongoing'
      return 'completed'
    }
  }
}
</script>

<style>
@import '@/styles/home.css';
</style>