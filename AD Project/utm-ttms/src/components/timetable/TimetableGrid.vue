<template>
  <div class="timetable-grid">
    <div class="timetable-header">
      <h2>{{ title }}</h2>
      <div class="timetable-controls">
        <select v-model="selectedWeek" class="week-select">
          <option value="current">Current Week</option>
          <option value="next">Next Week</option>
        </select>
        <button class="btn-export" @click="exportTimetable">
          Export
        </button>
      </div>
    </div>

    <div class="timetable-container">
      <div class="timetable-grid-layout">
        <!-- Time column header -->
        <div class="time-header">Time</div>
        
        <!-- Day headers -->
        <div 
          v-for="day in days" 
          :key="day" 
          class="day-header"
        >
          {{ day }}
        </div>

        <!-- Time slots and course cells -->
        <template v-for="(timeSlot, timeIndex) in timeSlots" :key="timeIndex">
          <div class="time-slot">{{ timeSlot }}</div>
          
          <div 
            v-for="day in days" 
            :key="`${day}-${timeIndex}`"
            class="course-cell"
            :class="{ 'has-course': getCourseForSlot(day, timeSlot) }"
          >
            <div 
              v-if="getCourseForSlot(day, timeSlot)" 
              class="course-block"
              @click="showCourseDetails(getCourseForSlot(day, timeSlot))"
            >
              <div class="course-code">
                {{ getCourseForSlot(day, timeSlot).course }}
                <span class="section">-{{ getCourseForSlot(day, timeSlot).section }}</span>
              </div>
              <div class="course-name">{{ getCourseForSlot(day, timeSlot).courseName }}</div>
              <div class="course-venue">{{ getCourseForSlot(day, timeSlot).venue }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Course Details Modal -->
    <div v-if="selectedCourse" class="modal-overlay" @click="closeModal">
      <div class="course-modal" @click.stop>
        <div class="modal-header">
          <h3>Course Details</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-content">
          <p><strong>Course:</strong> {{ selectedCourse.course }}-{{ selectedCourse.section }}</p>
          <p><strong>Name:</strong> {{ selectedCourse.courseName }}</p>
          <p><strong>Time:</strong> {{ selectedCourse.time }}</p>
          <p><strong>Venue:</strong> {{ selectedCourse.venue }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimetableGrid',
  props: {
    timetableData: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: 'Weekly Timetable'
    }
  },
  data() {
    return {
      selectedWeek: 'current',
      selectedCourse: null,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: [
        '8:00 AM - 10:00 AM',
        '10:00 AM - 12:00 PM',
        '12:00 PM - 2:00 PM',
        '2:00 PM - 4:00 PM',
        '4:00 PM - 6:00 PM'
      ]
    }
  },
  methods: {
    getCourseForSlot(day, timeSlot) {
      const daySchedule = this.timetableData[day]
      if (!daySchedule) return null
      
      return daySchedule.find(course => course.time === timeSlot) || null
    },
    showCourseDetails(course) {
      this.selectedCourse = course
    },
    closeModal() {
      this.selectedCourse = null
    },
    exportTimetable() {
      this.$emit('export-timetable', this.timetableData)
    }
  },
  emits: ['export-timetable']
}
</script>