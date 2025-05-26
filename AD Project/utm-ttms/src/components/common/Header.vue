<template>
  <header class="header">
    <h1>UTM Faculty of Computing</h1>
    <p>Timetable Management System</p>
    <div v-if="user" class="header-user-info">
      <span class="welcome-text">Welcome, {{ user.name }}</span>
      <span class="user-role">({{ formatRole(user.role) }})</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatRole(role) {
      if (!role) return '';
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
  }
}
</script>

<style scoped>
.header-user-info {
  text-align: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(113, 128, 150, 0.2);
}

.welcome-text {
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 600;
}

.user-role {
  color: #718096;
  font-size: 0.9rem;
  margin-left: 5px;
}
</style>