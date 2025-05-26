<template>
  <div class="courses-container">
    <div class="header-section">
      <h1 class="page-title">Course Management</h1>
      <p class="page-subtitle">Browse and manage courses across different sessions</p>
    </div>

    <div class="controls-section">
      <div class="search-controls">
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search courses by code, name, or lecturer..." 
            class="search-input"
          >
          <button class="search-btn">🔍</button>
        </div>
        
        <div class="filter-controls">
          <select v-model="selectedSession" class="filter-select">
            <option value="">All Sessions</option>
            <option v-for="session in availableSessions" :key="session" :value="session">
              {{ session }}
            </option>
          </select>
          
          <select v-model="creditFilter" class="filter-select">
            <option value="">All Credits</option>
            <option value="1">1 Credit</option>
            <option value="2">2 Credits</option>
            <option value="3">3 Credits</option>
            <option value="4">4 Credits</option>
          </select>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-card">
        <h3>{{ filteredCourses.length }}</h3>
        <p>Total Courses</p>
      </div>
      <div class="stat-card">
        <h3>{{ totalCredits }}</h3>
        <p>Total Credits</p>
      </div>
      <div class="stat-card">
        <h3>{{ uniqueLecturers.length }}</h3>
        <p>Lecturers</p>
      </div>
    </div>

    <div class="courses-section">
      <div class="session-tabs">
        <button 
          v-for="session in availableSessions" 
          :key="session"
          @click="selectedSession = selectedSession === session ? '' : session"
          :class="['tab-btn', { active: selectedSession === session }]"
        >
          {{ session }}
        </button>
      </div>

      <div class="courses-grid">
        <div 
          v-for="course in filteredCourses" 
          :key="course.code"
          class="course-card"
          @click="selectCourse(course)"
          :class="{ selected: selectedCourse?.code === course.code }"
        >
          <div class="course-header">
            <div class="course-code">{{ course.code }}</div>
            <div class="course-credits">{{ course.credit }} CR</div>
          </div>
          <h3 class="course-name">{{ course.name }}</h3>
          <div class="course-details">
            <div class="detail-item">
              <span class="detail-label">👨‍🏫 Lecturer:</span>
              <span class="detail-value">{{ course.lecturer }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">📍 Venue:</span>
              <span class="detail-value">{{ course.venue }}</span>
            </div>
          </div>
          <div class="course-actions">
            <button class="action-btn primary">View Details</button>
            <button class="action-btn secondary">Add to Schedule</button>
          </div>
        </div>
      </div>

      <div v-if="filteredCourses.length === 0" class="no-results">
        <div class="no-results-icon">📚</div>
        <h3>No courses found</h3>
        <p>Try adjusting your search criteria or filters</p>
      </div>
    </div>

    <!-- Course Detail Modal -->
    <div v-if="selectedCourse" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedCourse.name }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-grid">
            <div class="detail-row">
              <strong>Course Code:</strong>
              <span>{{ selectedCourse.code }}</span>
            </div>
            <div class="detail-row">
              <strong>Credits:</strong>
              <span>{{ selectedCourse.credit }}</span>
            </div>
            <div class="detail-row">
              <strong>Lecturer:</strong>
              <span>{{ selectedCourse.lecturer }}</span>
            </div>
            <div class="detail-row">
              <strong>Venue:</strong>
              <span>{{ selectedCourse.venue }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="action-btn secondary" @click="closeModal">Close</button>
          <button class="action-btn primary">Add to My Courses</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Courses',
  data() {
    return {
      searchQuery: '',
      selectedSession: '',
      creditFilter: '',
      selectedCourse: null,
      coursesData: {
        "sessions": {
          "Session 2024/2025": [
            { "code": "SECR3203 - 07", "name": "Theory Of Computer Science", "credit": 3, "lecturer": "Dr Ali", "venue": "IT 1-12" },
            { "code": "SECR2242 - 02", "name": "Computer Network", "credit": 3, "lecturer": "Prof Bee", "venue": "DK2" },
            { "code": "SECJ2941 - 02", "name": "Computer Network Lab", "credit": 1, "lecturer": "Mr Chan", "venue": "Lab 3" },
            { "code": "SECR3104 - 01", "name": "Applications Development", "credit": 4, "lecturer": "Dr Razak", "venue": "IT 2-11" },
            { "code": "SECR3223 - 03", "name": "High Performance & Parallel Computing", "credit": 3, "lecturer": "Dr Eva", "venue": "Room 204" },
            { "code": "SECR3253 - 01", "name": "Network Programming", "credit": 2, "lecturer": "Ms Farah", "venue": "Lab 1" },
            { "code": "UHBL2122 - 53", "name": "Professional Communication Skills 1", "credit": 2, "lecturer": "Mr Zaid", "venue": "LT1" }
          ],
          "Session 2023/2024": [
            { "code": "SECR3203 - 01", "name": "Intro to Software Engineering", "credit": 3, "lecturer": "Dr Lee", "venue": "Room 105" },
            { "code": "SECR2223 - 02", "name": "Database Systems", "credit": 3, "lecturer": "Dr Kim", "venue": "Room 110" },
            { "code": "SECJ2101 - 03", "name": "Programming Lab 1", "credit": 1, "lecturer": "Ms Hana", "venue": "Lab 2" }
          ]
        }
      }
    }
  },
  computed: {
    availableSessions() {
      return Object.keys(this.coursesData.sessions);
    },
    allCourses() {
      let courses = [];
      for (const session in this.coursesData.sessions) {
        courses = courses.concat(this.coursesData.sessions[session].map(course => ({
          ...course,
          session
        })));
      }
      return courses;
    },
    filteredCourses() {
      let courses = this.allCourses;
      
      if (this.selectedSession) {
        courses = courses.filter(course => course.session === this.selectedSession);
      }
      
      if (this.creditFilter) {
        courses = courses.filter(course => course.credit.toString() === this.creditFilter);
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        courses = courses.filter(course => 
          course.code.toLowerCase().includes(query) ||
          course.name.toLowerCase().includes(query) ||
          course.lecturer.toLowerCase().includes(query)
        );
      }
      
      return courses;
    },
    totalCredits() {
      return this.filteredCourses.reduce((sum, course) => sum + course.credit, 0);
    },
    uniqueLecturers() {
      const lecturers = new Set(this.filteredCourses.map(course => course.lecturer));
      return Array.from(lecturers);
    }
  },
  methods: {
    selectCourse(course) {
      this.selectedCourse = course;
    },
    closeModal() {
      this.selectedCourse = null;
    }
  }
}
</script>

<style scoped>
.courses-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.page-subtitle {
  color: #666;
  font-size: 1.1rem;
}

.controls-section {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-bar {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: #667eea;
}

.search-btn {
  padding: 12px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-size: 1.2rem;
}

.filter-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 10px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 120px;
}

.stat-card h3 {
  font-size: 2rem;
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.stat-card p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.courses-section {
  max-width: 1200px;
  margin: 0 auto;
}

.session-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.tab-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.course-card.selected {
  border-color: #667eea;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.course-code {
  background: #667eea;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
}

.course-credits {
  background: #f8f9ff;
  color: #667eea;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
}

.course-name {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.course-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.detail-label {
  width: 100px;
  color: #666;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
  font-weight: 500;
}

.course-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #667eea;
  color: white;
}

.action-btn.primary:hover {
  background: #5a6fd8;
}

.action-btn.secondary {
  background: #f8f9ff;
  color: #667eea;
  border: 1px solid #e1e5e9;
}

.action-btn.secondary:hover {
  background: #e8ebff;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e5e9;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1.5rem;
}

.detail-grid {
  display: grid;
  gap: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e1e5e9;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .search-controls {
    align-items: stretch;
  }
  
  .search-bar {
    max-width: none;
  }
  
  .stats-section {
    gap: 1rem;
  }
  
  .course-actions {
    flex-direction: column;
  }
}
</style>