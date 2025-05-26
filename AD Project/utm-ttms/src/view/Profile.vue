<template>
  <div class="profile-container">
    <div class="content-header">
      <h1>Student Profile</h1>
      <p>Manage your personal information and academic details</p>
    </div>
    
    <div class="content-card">
      <div class="profile-header">
        <div class="profile-avatar">
          {{ initials }}
        </div>
        <h2>{{ profile.name }}</h2>
        <p class="student-id">{{ profile.studentId }}</p>
      </div>
      
      <div class="profile-info">
        <div class="info-item">
          <span class="info-label">Full Name</span>
          <span class="info-value">{{ profile.name }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Student ID</span>
          <span class="info-value">{{ profile.studentId }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Faculty</span>
          <span class="info-value">{{ profile.faculty }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Program</span>
          <span class="info-value">{{ profile.program }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Year of Study</span>
          <span class="info-value">{{ profile.yearOfStudy }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Session</span>
          <span class="info-value">{{ profile.session }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Email</span>
          <span class="info-value">{{ profile.email }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Contact Number</span>
          <span class="info-value">{{ profile.phone }}</span>
        </div>
      </div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Academic Information</h2>
      <div class="academic-info">
        <div class="academic-item">
          <div class="academic-icon">🎓</div>
          <div class="academic-content">
            <h3>Current Semester</h3>
            <p>{{ profile.currentSemester }}</p>
          </div>
        </div>
        
        <div class="academic-item">
          <div class="academic-icon">📊</div>
          <div class="academic-content">
            <h3>CGPA</h3>
            <p>{{ profile.cgpa }}</p>
          </div>
        </div>
        
        <div class="academic-item">
          <div class="academic-icon">📚</div>
          <div class="academic-content">
            <h3>Total Credit Hours Completed</h3>
            <p>{{ profile.completedCredits }}</p>
          </div>
        </div>
        
        <div class="academic-item">
          <div class="academic-icon">🎯</div>
          <div class="academic-content">
            <h3>Academic Status</h3>
            <p>{{ profile.academicStatus }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Quick Actions</h2>
      <div class="action-buttons">
        <router-link to="/student-courses" class="action-btn primary">
          📚 View My Courses
        </router-link>
        <router-link to="/timetable" class="action-btn secondary">
          📅 View Timetable
        </router-link>
        <button class="action-btn tertiary" @click="editProfile">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import studentCourseData from '@/data/student_courseData.json'

export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: studentCourseData.name,
        studentId: 'A21EC0001',
        faculty: 'Faculty of Computing',
        program: 'Bachelor of Computer Science (Software Engineering)',
        yearOfStudy: 'Year 3',
        session: '2024/2025',
        email: 'aisyah.mawaddah@graduate.utm.my',
        phone: '+60 12-345 6789',
        currentSemester: 'Semester 1',
        cgpa: '3.67',
        completedCredits: '98',
        academicStatus: 'Good Standing'
      }
    }
  },
  computed: {
    initials() {
      return this.profile.name
        .split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    }
  },
  methods: {
    editProfile() {
      alert('Edit profile functionality would be implemented here!')
    }
  }
}
</script>

<style scoped>
.student-id {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.academic-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.academic-item {
  background: var(--light-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
}

.academic-item:hover {
  background: var(--white);
  box-shadow: var(--shadow);
}

.academic-icon {
  font-size: 2rem;
  background: var(--secondary-color);
  color: var(--white);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.academic-content h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.academic-content p {
  color: var(--text-dark);
  font-weight: 600;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
}

.action-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn.primary {
  background-color: var(--secondary-color);
  color: var(--white);
}

.action-btn.primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.action-btn.secondary {
  background-color: var(--success-color);
  color: var(--white);
}

.action-btn.secondary:hover {
  background-color: #229954;
  transform: translateY(-2px);
}

.action-btn.tertiary {
  background-color: var(--warning-color);
  color: var(--white);
}

.action-btn.tertiary:hover {
  background-color: #e67e22;
  transform: translateY(-2px);
}
</style>