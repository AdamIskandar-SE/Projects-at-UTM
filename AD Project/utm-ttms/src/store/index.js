import { createPinia } from 'pinia'

// Create pinia instance
const pinia = createPinia()

// Plugin to persist authentication state
pinia.use(({ store }) => {
  // Persist auth state to localStorage
  if (store.$id === 'auth') {
    const stored = localStorage.getItem('utm-auth-state')
    if (stored) {
      try {
        const parsedState = JSON.parse(stored)
        store.$patch(parsedState)
      } catch (error) {
        console.error('Failed to parse stored auth state:', error)
        localStorage.removeItem('utm-auth-state')
      }
    }

    // Watch for changes and save to localStorage
    store.$subscribe((mutation, state) => {
      localStorage.setItem('utm-auth-state', JSON.stringify({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        sessionId: state.sessionId,
        adminSessionId: state.adminSessionId
      }))
    })
  }
})

export default pinia