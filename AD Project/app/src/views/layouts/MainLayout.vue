<!-- app/src/views/layouts/MainLayout.vue -->
<template>
  <div>
    <!-- Sidebar -->
    <nav class="w3-sidebar w3-bar-block w3-card" id="sidebar">
      <div class="w3-container w3-theme-d2">
        <span @click="closeSidebar" class="w3-button w3-display-topright w3-large">X</span>
        <br>
        <div class="user-info">
          <div class="w3-container w3-center">
            <div class="w3-circle w3-theme-l3 user-avatar">
              {{ getUserInitials() }}
            </div>
            <h4>{{ user.full_name }}</h4>
            <p class="w3-small">{{ user.description }}</p>
            <p class="w3-small w3-text-light-grey">{{ user.login_name }}</p>
          </div>
        </div>
      </div>
      
      <a class="w3-bar-item w3-button link" @click="loadPage('profile')">
        <i class="fas fa-user menu-icon"></i> Profile
      </a>
      <a class="w3-bar-item w3-button link" @click="loadPage('timetable')">
        <i class="fas fa-calendar-alt menu-icon"></i> Timetable
      </a>
      <a class="w3-bar-item w3-button link" @click="loadPage('courses')">
        <i class="fas fa-book menu-icon"></i> Courses
      </a>
      
      <div class="w3-bar-item w3-theme-l4 logout-section">
        <a class="w3-bar-item w3-button link w3-text-red" @click="logout">
          <i class="fas fa-sign-out-alt menu-icon"></i> Logout
        </a>
      </div>
    </nav>

    <!-- Header -->
    <header class="w3-bar w3-card w3-theme">
      <button class="w3-bar-item w3-button w3-xxlarge" @click="openSidebar">&#9776;</button>
      <span class="w3-bar-item app-title">FC Timetable</span>
      <span class="w3-bar-item w3-right">{{ currentTime }}</span>
    </header>
    
    <!-- Main Content -->
    <div class="w3-container" id="mainContent">
      <slot></slot>
    </div>

    <!-- Footer -->
    <footer class="w3-container w3-theme w3-padding">
      <p class="copyright">&copy; 2025, Faculty of Computing, UTM</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: User.getCurrentUser() || {},
      currentTime: '',
      sidebarOpen: false
    };
  },
  
  methods: {
    getUserInitials() {
      return User.getUserInitials(this.user.full_name);
    },
    
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('en-MY', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    },
    
    loadPage(page) {
      this.$emit('page-change', page);
      this.closeSidebar();
    },
    
    openSidebar() {
      this.sidebarOpen = true;
    },
    
    closeSidebar() {
      this.sidebarOpen = false;
    },
    
    logout() {
      if (confirm("Are you sure you want to logout?")) {
        const authController = new AuthController();
        authController.logout();
      }
    }
  },
  
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  }
};
</script>