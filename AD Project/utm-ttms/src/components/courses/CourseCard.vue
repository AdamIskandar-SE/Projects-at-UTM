<template>
  <div class="course-card" @click="$emit('course-click', course)">
    <div class="course-code">{{ course.code }}</div>
    <h3 class="course-name">{{ course.name }}</h3>
    <div class="course-meta">
      <div class="course-lecturer">{{ course.lecturer }}</div>
      <div class="course-credits">{{ course.credit }} Credits</div>
    </div>
    <div v-if="course.venue" class="course-venue">
      <strong>Venue:</strong> {{ course.venue }}
    </div>
    <div v-if="showSection && course.code" class="course-section">
      <strong>Section:</strong> {{ getSection(course.code) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    },
    showSection: {
      type: Boolean,
      default: true
    }
  },
  emits: ['course-click'],
  methods: {
    getSection(code) {
      if (!code) return 'N/A';
      const parts = code.split(' - ');
      return parts.length > 1 ? parts[1] : 'N/A';
    }
  }
}
</script>

<style scoped>
.course-venue,
.course-section {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #4a5568;
}

.course-venue {
  color: #e53e3e;
}
</style>