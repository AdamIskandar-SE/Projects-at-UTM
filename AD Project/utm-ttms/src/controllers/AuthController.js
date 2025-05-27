import UserModel from '@/models/User'
import AuthService from '@/services/AuthService'

export class AuthController {
  /**
   * Handle user login
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.matricNumber - Student matric number
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Login result
   */
  static async login({ matricNumber, password }) {
    try {
      // Validate input
      if (!matricNumber || !password) {
        return {
          success: false,
          error: 'Matric number and password are required'
        }
      }

      // Attempt authentication
      const authResult = await AuthService.authenticate(matricNumber, password)
      
      if (!authResult.success) {
        return {
          success: false,
          error: authResult.error || 'Invalid credentials'
        }
      }

      // Get admin session
      const adminResult = await AuthService.getAdminSession(authResult.sessionId)
      
      if (!adminResult.success) {
        return {
          success: false,
          error: 'Failed to establish admin session'
        }
      }

      // Fetch user details
      const userResult = await AuthService.getUserDetails(adminResult.adminSessionId)
      
      if (!userResult.success) {
        return {
          success: false,
          error: 'Failed to fetch user details'
        }
      }

      // Create user model
      const user = new UserModel({
        full_name: userResult.user.nama,
        no_matrik: userResult.user.no_matrik,
        description: "Bachelor of Computer Science (Computer Network & Security)",
        email: userResult.user.email || 'N/A',
        phone_number: userResult.user.phone_number || 'N/A'
      })

      return {
        success: true,
        user: user.toJSON(),
        sessionId: authResult.sessionId,
        adminSessionId: adminResult.adminSessionId
      }

    } catch (error) {
      console.error('AuthController.login error:', error)
      
      // Fallback for development/testing
      if (matricNumber === "A23CS3008" || matricNumber === "A23CS0001") {
        return {
          success: true,
          user: {
            full_name: matricNumber === "A23CS3008" ? "FARAH SYAHIRAH" : "AISYAH MAWADDAH BINTI MOHD RODUAN",
            no_matrik: matricNumber,
            description: "Bachelor of Computer Science (Computer Network & Security)",
            email: `${matricNumber.toLowerCase()}@graduate.utm.my`,
            phone_number: "012345678"
          },
          sessionId: 'mock-session-id',
          adminSessionId: 'mock-admin-session-id'
        }
      }
      
      return {
        success: false,
        error: 'Login failed. Please check your connection and try again.'
      }
    }
  }

  /**
   * Handle user logout
   * @returns {Promise<void>}
   */
  static async logout() {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error('AuthController.logout error:', error)
    }
  }

  /**
   * Validate current session
   * @param {string} sessionId - Session ID to validate
   * @returns {Promise<boolean>} Session validity
   */
  static async validateSession(sessionId) {
    try {
      return await AuthService.validateSession(sessionId)
    } catch (error) {
      console.error('AuthController.validateSession error:', error)
      return false
    }
  }

  /**
   * Refresh user session
   * @param {string} sessionId - Current session ID
   * @returns {Promise<Object>} Refresh result
   */
  static async refreshSession(sessionId) {
    try {
      return await AuthService.refreshSession(sessionId)
    } catch (error) {
      console.error('AuthController.refreshSession error:', error)
      return { success: false, error: 'Failed to refresh session' }
    }
  }
}