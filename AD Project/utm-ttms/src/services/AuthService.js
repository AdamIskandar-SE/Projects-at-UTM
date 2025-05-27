import ApiService from '@/services/ApiServices'

export class AuthService {
  /**
   * Authenticate user with matric number and password
   * @param {string} matricNumber - Student matric number
   * @param {string} password - User password
   * @returns {Promise<Object>} Authentication result
   */
  static async authenticate(matricNumber, password) {
    try {
      const response = await ApiService.post('authentication', {
        login: matricNumber,
        password: password
      })

      if (response && response.length > 0) {
        return {
          success: true,
          sessionId: response[0].session_id
        }
      }

      return {
        success: false,
        error: 'Invalid credentials'
      }
    } catch (error) {
      console.error('AuthService.authenticate error:', error)
      return {
        success: false,
        error: 'Authentication failed'
      }
    }
  }

  /**
   * Get admin session ID
   * @param {string} sessionId - User session ID
   * @returns {Promise<Object>} Admin session result
   */
  static async getAdminSession(sessionId) {
    try {
      const response = await ApiService.post('auth-admin.php', {
        session_id: sessionId
      })

      if (response && response.length > 0) {
        return {
          success: true,
          adminSessionId: response[0].session_id
        }
      }

      return {
        success: false,
        error: 'Failed to get admin session'
      }
    } catch (error) {
      console.error('AuthService.getAdminSession error:', error)
      return {
        success: false,
        error: 'Admin session failed'
      }
    }
  }

  /**
   * Get user details
   * @param {string} adminSessionId - Admin session ID
   * @returns {Promise<Object>} User details result
   */
  static async getUserDetails(adminSessionId) {
    try {
      const response = await ApiService.post('pelajar', {
        session_id: adminSessionId,
        sesi: '2024/2025',
        semester: '3',
        limit: 1,
        offset: 0
      })

      if (response && response.length > 0) {
        return {
          success: true,
          user: response[0]
        }
      }

      return {
        success: false,
        error: 'User not found'
      }
    } catch (error) {
      console.error('AuthService.getUserDetails error:', error)
      return {
        success: false,
        error: 'Failed to fetch user details'
      }
    }
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  static async logout() {
    try {
      // Clear any server-side session if needed
      // await ApiService.post('logout', {})
      console.log('User logged out')
    } catch (error) {
      console.error('AuthService.logout error:', error)
    }
  }

  /**
   * Validate session
   * @param {string} sessionId - Session ID to validate
   * @returns {Promise<boolean>} Session validity
   */
  static async validateSession(sessionId) {
    try {
      const response = await ApiService.post('validate-session', {
        session_id: sessionId
      })
      
      return response && response.valid === true
    } catch (error) {
      console.error('AuthService.validateSession error:', error)
      return false
    }
  }

  /**
   * Refresh session
   * @param {string} sessionId - Current session ID
   * @returns {Promise<Object>} Refresh result
   */
  static async refreshSession(sessionId) {
    try {
      const response = await ApiService.post('refresh-session', {
        session_id: sessionId
      })

      if (response && response.session_id) {
        return {
          success: true,
          sessionId: response.session_id
        }
      }

      return {
        success: false,
        error: 'Failed to refresh session'
      }
    } catch (error) {
      console.error('AuthService.refreshSession error:', error)
      return {
        success: false,
        error: 'Session refresh failed'
      }
    }
  }
}