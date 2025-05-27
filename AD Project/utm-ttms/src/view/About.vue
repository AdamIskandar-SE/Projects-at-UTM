<template>
  <div class="about-container">
    <div class="content-header">
      <h1>About UTM TTMS</h1>
      <p>Learn more about our Timetable Management System</p>
    </div>
    
    <div class="content-card">
      <div class="about-content">
        <h2>Overview</h2>
        <p>
          The UTM Timetable Management System (TTMS) is a comprehensive web-based application designed 
          specifically for the Faculty of Computing at Universiti Teknologi Malaysia (UTM). This system 
          provides students, faculty, and administrators with an efficient platform to manage academic 
          schedules, course information, and timetabling operations.
        </p>
        
        <h2>Key Features</h2>
        <ul>
          <li><strong>Interactive Timetable:</strong> View your weekly schedule with detailed course information, venues, and timings</li>
          <li><strong>Course Management:</strong> Browse available courses across different academic sessions</li>
          <li><strong>Student Profile:</strong> Manage personal information and track academic progress</li>
          <li><strong>Enrolled Courses:</strong> Monitor your current course load and credit hours</li>
          <li><strong>Responsive Design:</strong> Access the system seamlessly across desktop and mobile devices</li>
          <li><strong>Real-time Updates:</strong> Get instant updates on schedule changes and announcements</li>
        </ul>
        
        <h2>Technology Stack</h2>
        <p>Our system is built using modern web technologies to ensure optimal performance and user experience:</p>
        <ul>
          <li><strong>Frontend:</strong> Vue.js 3 with Vue Router for navigation and Pinia for state management</li>
          <li><strong>Build Tool:</strong> Vite for fast development and optimized production builds</li>
          <li><strong>Styling:</strong> Custom CSS with responsive design principles</li>
          <li><strong>Data Management:</strong> JSON-based data structure for course and timetable information</li>
        </ul>
        
        <h2>System Benefits</h2>
        <ul>
          <li>Eliminates scheduling conflicts through intelligent timetable management</li>
          <li>Provides centralized access to all academic information</li>
          <li>Reduces administrative workload through automated processes</li>
          <li>Enhances student experience with intuitive user interface</li>
          <li>Supports mobile access for on-the-go schedule checking</li>
          <li>Maintains data consistency across all academic operations</li>
        </ul>
        
        <h2>Contact Information</h2>
        <p>
          For technical support, feedback, or inquiries about the UTM Timetable Management System, 
          please contact the Faculty of Computing IT Support Team:
        </p>
        <ul>
          <li><strong>Email:</strong> fc-support@utm.my</li>
          <li><strong>Phone:</strong> +607-553 4333</li>
          <li><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</li>
          <li><strong>Location:</strong> Faculty of Computing, UTM Johor Bahru</li>
        </ul>
        
        <h2>Version Information</h2>
        <p>
          <strong>Current Version:</strong> 1.0.0<br>
          <strong>Last Updated:</strong> {{ currentDate }}<br>
          <strong>Developed by:</strong> UTM Faculty of Computing IT Team
        </p>
      </div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Quick Links</h2>
      <div class="quick-links">
        <router-link to="/" class="quick-link-card">
          <div class="link-icon">🏠</div>
          <div class="link-content">
            <h3>Home</h3>
            <p>Return to the main dashboard</p>
          </div>
        </router-link>
        
        <router-link to="/courses" class="quick-link-card">
          <div class="link-icon">📚</div>
          <div class="link-content">
            <h3>Browse Courses</h3>
            <p>Explore available courses</p>
          </div>
        </router-link>
        
        <router-link to="/timetable" class="quick-link-card">
          <div class="link-icon">📅</div>
          <div class="link-content">
            <h3>View Timetable</h3>
            <p>Check your weekly schedule</p>
          </div>
        </router-link>
        
        <router-link to="/profile" class="quick-link-card">
          <div class="link-icon">👤</div>
          <div class="link-content">
            <h3>Profile</h3>
            <p>Manage your account</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.quick-link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--light-bg);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.quick-link-card:hover {
  background: var(--white);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.link-icon {
  font-size: 2.5rem;
  background: var(--secondary-color);
  color: var(--white);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.link-content h3 {
  color: var(--primary-color);
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.link-content p {
  color: var(--text-light);
  font-size: 0.9rem;
  margin: 0;
}
</style>