<template>
  <nav class="side-bar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
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

      <button class="nav-toggle" @click="toggleMenu" aria-label="Toggle navigation menu">
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
  emits: ['logout'],
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
    },
    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false
        this.isMenuOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  }
}
</script>

<style scoped>
.side-bar {
  background-color: #1a1a2e;
  color: white;
  min-height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.nav-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
}

.nav-brand {
  margin-bottom: 2rem;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.brand-logo {
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
}

.brand-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #ccc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #16213e;
  color: white;
}

.nav-link-active {
  background-color: #4a5568;
  color: white;
}

.nav-link i {
  margin-right: 0.75rem;
  width: 20px;
}

.nav-user {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-name {
  font-size: 0.9rem;
  color: #ccc;
}

.user-dropdown {
  position: relative;
}

.user-avatar {
  background: none;
  border: none;
  cursor: pointer;
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: black;
  min-width: 150px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.dropdown-open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: black;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item i {
  margin-right: 0.5rem;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #eee;
}

.login-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4a5568;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #2d3748;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
}

/* Mobile styles */
@media (max-width: 768px) {
  .side-bar {
    transform: translateX(-100%);
    width: 280px;
  }
  
  .nav-menu-open {
    transform: translateX(0);
  }
  
  .nav-toggle {
    display: flex;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
  }
}

/* Icon placeholders - replace with your icon library */
.icon-home::before { content: "🏠"; }
.icon-calendar::before { content: "📅"; }
.icon-book::before { content: "📚"; }
.icon-user-check::before { content: "👤"; }
.icon-info::before { content: "ℹ️"; }
.icon-user::before { content: "👤"; }
.icon-settings::before { content: "⚙️"; }
.icon-logout::before { content: "🚪"; }
</style>