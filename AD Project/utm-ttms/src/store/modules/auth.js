import { AuthController } from '@/controllers/AuthController'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    sessionId: null,
    adminSessionId: null,
    loading: false,
    error: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userInitials: (state) => {
      if (!state.user?.full_name) return '?'
      return state.user.full_name
        .split(' ')
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    }
  },

  actions: {
    async initializeAuth() {
      this.loading = true
      try {
        // Check if user was previously authenticated
        const stored = localStorage.getItem('utm-auth-state')
        if (stored) {
          const parsedState = JSON.parse(stored)
          if (parsedState.isAuthenticated && parsedState.user) {
            this.isAuthenticated = true
            this.user = parsedState.user
            this.sessionId = parsedState.sessionId
            this.adminSessionId = parsedState.adminSessionId
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        this.clearAuth()
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const result = await AuthController.login(credentials)
        
        if (result.success) {
          this.isAuthenticated = true
          this.user = result.user
          this.sessionId = result.sessionId
          this.adminSessionId = result.adminSessionId
          return { success: true }
        } else {
          this.error = result.error
          return { success: false, error: result.error }
        }
      } catch (error) {
        this.error = 'Login failed. Please try again.'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await AuthController.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuth()
      }
    },

    clearAuth() {
      this.isAuthenticated = false
      this.user = null
      this.sessionId = null
      this.adminSessionId = null
      this.error = null
      localStorage.removeItem('utm-auth-state')
    },

    clearError() {
      this.error = null
    }
  }
})