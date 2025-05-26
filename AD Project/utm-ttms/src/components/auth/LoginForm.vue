<template>
  <div class="login-form">
    <h2 class="login-title">UTM Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="form-input"
          placeholder="Enter your username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-input"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="form-group">
        <label for="role" class="form-label">Login as</label>
        <select id="role" v-model="role" class="form-input" required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="lecturer">Lecturer</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      role: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = '';

      try {
        // Simulate login validation
        if (this.username && this.password && this.role) {
          // For demo purposes, accept any valid input
          const userData = {
            username: this.username,
            role: this.role,
            name: this.role === 'student' ? 'AISYAH MAWADDAH BINTI MOHD RODUAN' : this.username
          };

          this.$emit('login-success', userData);
        } else {
          this.error = 'Please fill in all fields';
        }
      } catch (error) {
        this.error = 'Login failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #e53e3e;
  background: #fed7d7;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>