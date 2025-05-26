<template>
  <div id="app" class="app-container">
    <!-- Loading screen -->
    <div v-if="isLoading" class="loading-screen">
      <LoadingSpinner />
    </div>
    
    <!-- Main application -->
    <div v-else>
      <!-- Authentication guard -->
      <div v-if="!authStore.isAuthenticated && requiresAuth">
        <router-view name="auth" />
      </div>
      
      <!-- Authenticated application -->
      <div v-else class="app-layout">
        <!-- Sidebar for authenticated users -->
        <Sidebar v-if="authStore.isAuthenticated" />
        
        <!-- Main content area -->
        <main class="main-content" :class="{ 'with-sidebar': authStore.isAuthenticated }">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import { useAuthStore } from '@/store/modules/auth'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    Sidebar,
    LoadingSpinner
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const isLoading = ref(true)

    // Routes that require authentication
    const protectedRoutes = ['profile', 'courses', 'student-courses', 'timetable', 'about']
    
    const requiresAuth = computed(() => {
      return protectedRoutes.includes(route.name)
    })

    onMounted(async () => {
      // Initialize application
      try {
        await authStore.initializeAuth()
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        isLoading.value = false
      }
    })

    return {
      authStore,
      isLoading,
      requiresAuth
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

.main-content.with-sidebar {
  margin-left: 0;
}

@media (min-width: 768px) {
  .main-content.with-sidebar {
    margin-left: 250px;
  }
}
</style>