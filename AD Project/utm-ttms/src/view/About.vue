<template>
  <div class="about-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">UTM Timetable Management System</h1>
        <p class="hero-subtitle">Faculty of Computing - Universiti Teknologi Malaysia</p>
        <div class="hero-description">
          <p>A comprehensive timetable management solution designed specifically for UTM Faculty of Computing students and staff.</p>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <h2 class="section-title">Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <h3>Interactive Timetable</h3>
            <p>View your weekly schedule with detailed course information, venues, and timings in an easy-to-read format.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Course Management</h3>
            <p>Access comprehensive course information including course codes, names, credits, and instructor details.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👨‍🎓</div>
            <h3>Student Profile</h3>
            <p>Manage your personal information and view your enrolled courses with credit calculations.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Course Search</h3>
            <p>Easily search and filter through available courses across different sessions and semesters.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <div class="container">
        <div class="info-grid">
          <div class="info-card">
            <h3>System Information</h3>
            <ul class="info-list">
              <li><strong>Version:</strong> 1.0.0</li>
              <li><strong>Framework:</strong> Vue.js 3</li>
              <li><strong>Target:</strong> Faculty of Computing Students</li>
              <li><strong>Purpose:</strong> Academic Timetable Management</li>
            </ul>
          </div>
          <div class="info-card">
            <h3>Contact Information</h3>
            <ul class="info-list">
              <li><strong>Faculty:</strong> Faculty of Computing</li>
              <li><strong>University:</strong> Universiti Teknologi Malaysia</li>
              <li><strong>Campus:</strong> UTM Johor Bahru</li>
              <li><strong>Support:</strong> Academic Affairs Office</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-section">
      <div class="container">
        <p class="footer-text">© 2024 UTM Faculty of Computing. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  metaInfo: {
    title: 'About - UTM Timetable System'
  }
}
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-section {
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-description {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
}

.features-section {
  background: white;
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
  font-weight: 600;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.info-section {
  background: #f8f9fa;
  padding: 60px 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.info-card h3 {
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  padding: 0.5rem 0;
  color: #555;
  border-bottom: 1px solid #eee;
}

.info-list li:last-child {
  border-bottom: none;
}

.footer-section {
  background: #333;
  padding: 30px 20px;
  text-align: center;
}

.footer-text {
  color: white;
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style><template>
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