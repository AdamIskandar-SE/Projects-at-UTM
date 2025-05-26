<template>
  <nav class="navigation-bar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <img src="/utm-logo.png" alt="UTM" class="brand-logo" />
          <span class="brand-text">UTM Timetable</span>
        </router-link>
      </div>

      <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === item.path }"
          @click="closeMenu"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </div>

      <div class="nav-user">
        <div class="user-info" v-if="user">
          <span class="user-name">{{ user.name }}</span>
          <div class="user-dropdown" :class="{ 'dropdown-open': isDropdownOpen }">
            <button class="user-avatar" @click="toggleDropdown">
              <img :src="user.avatar || '/default-avatar.png'" :alt="user.name" />
            </button>
            <div class="dropdown-menu">
              <router-link to="/profile" class="dropdown-item" @click="closeDropdown">
                <i class="icon-user"></i>
                Profile
              </router-link>
              <router-link to="/settings" class="dropdown-item" @click="closeDropdown">
                <i class="icon-settings"></i>
                Settings
              </router-link>
              <hr class="dropdown-divider" />
              <button class="dropdown-item logout-btn" @click="logout">
                <i class="icon-logout"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
        <router-link v-else to="/login" class="login-btn">
          Login
        </router-link>
      </div>

      <button class="nav-toggle" @click="toggleMenu">
        <span class="hamburger"></span>
        <span class="hamburger"></span>
        <span class="hamburger"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      menuItems: [
        { path: '/', label: 'Home', icon: 'icon-home' },
        { path: '/timetable', label: 'Timetable', icon: 'icon-calendar' },
        { path: '/courses', label: 'Courses', icon: 'icon-book' },
        { path: '/student-courses', label: 'My Courses', icon: 'icon-user-check' },
        { path: '/about', label: 'About', icon: 'icon-info' }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown() {
      this.isDropdownOpen = false
    },
    logout() {
      this.closeDropdown()
      this.$emit('logout')
    }
  },
  mounted() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false
        this.isMenuOpen = false
      }
    })
  },
  emits: ['logout']
}
</script>