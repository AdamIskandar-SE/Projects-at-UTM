<!-- app/src/views/pages/LoginPage.vue -->
<template>
  <div class="w3-container login-container">
    <h2 class="w3-center w3-text-blue">FC Timetable System</h2>
    <div class="w3-panel w3-pale-blue">
      <p>Please login with your UTM credentials</p>
    </div>
    
    <form @submit.prevent="login">
      <label class="w3-text-blue"><b>Username</b></label>
      <input class="w3-input w3-border" type="text" v-model="username" required>
      
      <label class="w3-text-blue"><b>Password</b></label>
      <input class="w3-input w3-border" type="password" v-model="password" required>
      
      <div v-if="errorMessage" class="w3-panel w3-pale-red">
        {{ errorMessage }}
      </div>
      
      <div class="w3-center w3-margin-top">
        <button class="w3-btn w3-blue" type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'A16CS4016',
      password: '201608M10112',
      errorMessage: '',
      loading: false
    };
  },
  
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = "Please enter both username and password";
        return;
      }
      
      this.loading = true;
      this.errorMessage = '';
      
      try {
        const authController = new AuthController();
        await authController.login(this.username, this.password);
        window.location.replace("main.html");
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    }
  },
  
  mounted() {
    // Redirect if already logged in
    const authController = new AuthController();
    if (authController.isAuthenticated()) {
      window.location.replace("main.html");
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
</style>