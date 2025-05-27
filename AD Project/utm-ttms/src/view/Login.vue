<template>
  <div class="login-page-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Welcome Back!</h1>
        <p>Please login to access your UTM Timetable.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email or Username</label>
          <input type="text" id="email" v-model="credentials.email" required placeholder="e.g., yourname@example.com" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="credentials.password" required placeholder="Enter your password" />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="login-footer">
        <router-link to="/forgot-password" class="footer-link">Forgot Password?</router-link>
        <span class="footer-separator">|</span>
        <router-link to="/register" class="footer-link">Create Account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      errorMessage: '', // To display login errors
    };
  },
  methods: {
    handleLogin() {
      this.errorMessage = ''; // Clear previous errors
      // Basic validation (you'll want more robust validation)
      if (!this.credentials.email || !this.credentials.password) {
        this.errorMessage = 'Please enter both email/username and password.';
        return;
      }

      // --- Placeholder for actual login logic ---
      // In a real application, you would call an API endpoint here:
      // e.g., this.$store.dispatch('auth/login', this.credentials)
      //      .then(() => this.$router.push('/'))
      //      .catch(error => this.errorMessage = error.message || 'Login failed.');
      console.log('Login attempt with:', this.credentials);

      // Simulate a successful login for now
      if (this.credentials.email === "test@utm.my" && this.credentials.password === "password") {
        alert('Login successful! (Placeholder)');
        // this.$router.push('/'); // Redirect to dashboard or home
      } else {
        this.errorMessage = 'Invalid credentials. (Placeholder - use test@utm.my / password)';
      }
    },
  },
};
</script>

<style scoped>
.login-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--light-bg, #f0f2f5); /* Fallback color */
  padding: 2rem;
}

.login-card {
  background: var(--white, #ffffff);
  padding: 2.5rem;
  border-radius: var(--border-radius, 8px);
  box-shadow: var(--shadow, 0 5px 15px rgba(0, 0, 0, 0.1));
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.login-header .login-logo {
  width: 60px; /* Adjust as needed */
  height: auto;
  margin-bottom: 1rem;
  /* Assuming the logo is dark on a light background, or you might need a different version */
}

.login-header h1 {
  font-size: 1.8rem;
  color: var(--primary-color, #1a1a2e); /* Using sidebar's dark color for contrast */
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--text-light, #666);
  margin-bottom: 2rem;
}

.login-form .form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.login-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.login-form input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius, 4px);
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.login-form input:focus {
  border-color: var(--primary-color, #1a1a2e);
  outline: none;
  box-shadow: 0 0 0 2px rgba(26, 26, 46, 0.2); /* Focus ring */
}

.login-button {
  width: 100%;
  padding: 0.85rem;
  background-color: var(--primary-color, #1a1a2e);
  color: var(--white, #ffffff);
  border: none;
  border-radius: var(--border-radius, 4px);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition, background-color 0.3s ease);
  margin-top: 0.5rem;
}

.login-button:hover {
  background-color: #2c2c4e; /* Slightly lighter shade of primary */
}

.error-message {
  color: red;
  background-color: #ffebee;
  border: 1px solid red;
  padding: 0.75rem;
  border-radius: var(--border-radius, 4px);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.login-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
}

.login-footer .footer-link {
  color: var(--primary-color, #1a1a2e);
  text-decoration: none;
}

.login-footer .footer-link:hover {
  text-decoration: underline;
}

.login-footer .footer-separator {
  margin: 0 0.5rem;
  color: #ccc;
}
</style>