<template>
  <div class="profile-card">
    <div class="profile-header">
      <div class="profile-avatar">
        {{ getInitials(user.name) }}
      </div>
      <h2 class="profile-name">{{ user.name }}</h2>
      <p class="profile-role">{{ formatRole(user.role) }}</p>
    </div>
    
    <div class="profile-info">
      <div class="info-item">
        <div class="info-label">Username</div>
        <div class="info-value">{{ user.username }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Role</div>
        <div class="info-value">{{ formatRole(user.role) }}</div>
      </div>
      <div class="info-item" v-if="user.role === 'student'">
        <div class="info-label">Total Courses</div>
        <div class="info-value">{{ totalCourses }}</div>
      </div>
      <div class="info-item" v-if="user.role === 'student'">
        <div class="info-label">Total Credits</div>
        <div class="info-value">{{ totalCredits }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Session</div>
        <div class="info-value">2024/2025</div>
      </div>
    </div>

    <div class="profile-actions">
      <button @click="$emit('logout')" class="btn btn-secondary">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    studentCourses: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    totalCourses() {
      return this.studentCourses.length;
    },
    totalCredits() {
      return this.studentCourses.reduce((total, course) => total + course.credit, 0);
    }
  },
  methods: {
    getInitials(name) {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
    },
    formatRole(role) {
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
  }
}
</script>

<style scoped>
.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 24px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin: 0 auto 16px;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 8px;
}

.profile-role {
  color: #718096;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.profile-info {
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: #4a5568;
}

.info-value {
  font-weight: 600;
  color: #2d3748;
}

.profile-actions {
  margin-top: 20px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background-color: #cbd5e0;
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: translateY(0);
}
</style>