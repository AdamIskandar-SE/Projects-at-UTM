<template>
  <div class="day-selector">
    <div class="day-tabs">
      <button
        v-for="day in availableDays"
        :key="day"
        class="day-tab"
        :class="{ active: selectedDay === day }"
        @click="selectDay(day)"
      >
        {{ day }}
      </button>
    </div>
    <div v-if="selectedDay" class="day-info">
      <p class="day-description">
        {{ getClassCount(selectedDay) }} class{{ getClassCount(selectedDay) !== 1 ? 'es' : '' }} 
        scheduled for <strong>{{ selectedDay }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DaySelector',
  props: {
    timetableData: {
      type: Object,
      default: () => ({})
    },
    selectedDay: {
      type: String,
      default: 'Mon'
    }
  },
  emits: ['day-change'],
  computed: {
    availableDays() {
      const defaultDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const availableDays = Object.keys(this.timetableData);
      
      // Return days that have data, maintaining the order
      return defaultDays.filter(day => availableDays.includes(day));
    }
  },
  methods: {
    selectDay(day) {
      if (day !== this.selectedDay) {
        this.$emit('day-change', day);
      }
    },
    getClassCount(day) {
      if (!this.timetableData[day]) return 0;
      return this.timetableData[day].length;
    }
  },
  mounted() {
    // Auto-select first available day if none selected
    if (!this.selectedDay && this.availableDays.length > 0) {
      this.selectDay(this.availableDays[0]);
    }
  }
}
</script>

<style scoped>
.day-info {
  margin-top: 15px;
  text-align: center;
}

.day-description {
  color: #718096;
  font-size: 0.9rem;
}
</style>