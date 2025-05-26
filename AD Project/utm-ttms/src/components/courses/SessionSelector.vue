<template>
  <div class="session-selector">
    <h3 class="session-title">Select Academic Session</h3>
    <div class="session-options">
      <button
        v-for="session in availableSessions"
        :key="session"
        class="session-option"
        :class="{ active: selectedSession === session }"
        @click="selectSession(session)"
      >
        {{ session }}
      </button>
    </div>
    <div v-if="selectedSession" class="session-info">
      <p class="session-description">
        Currently viewing courses for <strong>{{ selectedSession }}</strong>
      </p>
      <div class="session-stats">
        <span class="stat-item">
          <strong>{{ courseCount }}</strong> courses available
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionSelector',
  props: {
    sessions: {
      type: Object,
      default: () => ({})
    },
    selectedSession: {
      type: String,
      default: ''
    }
  },
  emits: ['session-change'],
  computed: {
    availableSessions() {
      return Object.keys(this.sessions);
    },
    courseCount() {
      if (!this.selectedSession || !this.sessions[this.selectedSession]) {
        return 0;
      }
      return this.sessions[this.selectedSession].length;
    }
  },
  methods: {
    selectSession(session) {
      if (session !== this.selectedSession) {
        this.$emit('session-change', session);
      }
    }
  },
  mounted() {
    // Auto-select first session if none selected
    if (!this.selectedSession && this.availableSessions.length > 0) {
      this.selectSession(this.availableSessions[0]);
    }
  }
}
</script>

<style scoped>
.session-info {
  margin-top: 20px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.session-description {
  color: #4a5568;
  margin-bottom: 10px;
}

.session-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  color: #718096;
  font-size: 0.9rem;
}

.stat-item strong {
  color: #667eea;
}
</style>