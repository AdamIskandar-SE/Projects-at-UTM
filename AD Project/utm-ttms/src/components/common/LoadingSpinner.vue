<template>
  <div class="loading-container" :class="{ 'loading-overlay': overlay }">
    <div class="loading-spinner" :class="sizeClass">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    message: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass() {
      return `spinner-${this.size}`
    }
  }
}
</script>