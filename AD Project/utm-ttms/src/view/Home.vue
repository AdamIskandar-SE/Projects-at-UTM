<template>
  <div class="home-container">
    <div class="hero-section">
      <h1>UTM Timetable Management System</h1>
      <p>Efficiently manage your academic schedule with our comprehensive timetable system</p>
      <router-link to="/timetable" class="cta-button">View My Timetable</router-link>
    </div>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">📅</div>
        <h3>Smart Scheduling</h3>
        <p>Automatically organize your classes and avoid scheduling conflicts with our intelligent timetable system.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">📚</div>
        <h3>Course Management</h3>
        <p>Easily browse and manage all your enrolled courses with detailed information and instructor details.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Academic Tracking</h3>
        <p>Keep track of your credit hours, course progress, and academic requirements in one centralized location.</p>
      </div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Quick Access</h2>
      <div class="features-grid">
        <router-link to="/courses" class="feature-card" style="text-decoration: none; color: inherit;">
          <div class="feature-icon">📖</div>
          <h3>Browse Courses</h3>
          <p>Explore available courses for the current session</p>
        </router-link>
        
        <router-link to="/student-courses" class="feature-card" style="text-decoration: none; color: inherit;">
          <div class="feature-icon">🎓</div>
          <h3>My Courses</h3>
          <p>View your enrolled courses and credit information</p>
        </router-link>
        
        <router-link to="/profile" class="feature-card" style="text-decoration: none; color: inherit;">
          <div class="feature-icon">👤</div>
          <h3>Profile</h3>
          <p>Manage your student profile and preferences</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>