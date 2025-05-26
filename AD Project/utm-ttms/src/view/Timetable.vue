    <template>
  <div class="timetable-container">
    <div class="timetable-header">
      <h1>Weekly Timetable</h1>
      <div class="timetable-controls">
        <select v-model="selectedWeek" class="week-selector">
          <option value="current">Current Week</option>
          <option value="next">Next Week</option>
        </select>
        <button @click="exportTimetable" class="export-btn">Export PDF</button>
      </div>
    </div>

    <div class="timetable-wrapper">
      <div class="timetable-grid">
        <!-- Time slots header -->
        <div class="time-header">Time</div>
        
        <!-- Day headers -->
        <div v-for="day in days" :key="day" class="day-header" :class="{ 'today': isToday(day) }">
          {{ day }}
          <span class="date-indicator">{{ getDateForDay(day) }}</span>
        </div>

        <!-- Time slots -->
        <template v-for="timeSlot in timeSlots" :key="timeSlot">
          <div class="time-slot">{{ timeSlot }}</div>
          
          <!-- Classes for each day -->
          <div v-for="day in days" :key="`${day}-${timeSlot}`" class="class-cell">
            <div v-if="getClassForSlot(day, timeSlot)" 
                 class="class-card" 
                 :class="getClassStatus(day, timeSlot)"
                 @click="showClassDetails(getClassForSlot(day, timeSlot))">
              <div class="class-code">{{ getClassForSlot(day, timeSlot).course }}-{{ getClassForSlot(day, timeSlot).section }}</div>
              <div class="class-name">{{ getClassForSlot(day, timeSlot).courseName }}</div>
              <div class="class-venue">{{ getClassForSlot(day, timeSlot).venue }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Class Details Modal -->
    <div v-if="selectedClass" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Class Details</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-row">
            <strong>Course:</strong> {{ selectedClass.course }}-{{ selectedClass.section }}
          </div>
          <div class="detail-row">
            <strong>Name:</strong> {{ selectedClass.courseName }}
          </div>
          <div class="detail-row">
            <strong>Time:</strong> {{ selectedClass.time }}
          </div>
          <div class="detail-row">
            <strong>Venue:</strong> {{ selectedClass.venue }}
          </div>
          <div class="detail-row">
            <strong>Lecturer:</strong> {{ getLecturerInfo(selectedClass.course) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timetable',
  data() {
    return {
      selectedWeek: 'current',
      selectedClass: null,
      timetableData: {},
      sessionData: {},
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
  mounted() {
    this.loadTimetableData()
    this.loadSessionData()
  },
  methods: {
    async loadTimetableData() {
      try {
        const response = await fetch('/src/data/timetableData.json')
        this.timetableData = await response.json()
      } catch (error) {
        console.error('Error loading timetable data:', error)
      }
    },
    async loadSessionData() {
      try {
        const response = await fetch('/src/data/session_courseData.json')
        this.sessionData = await response.json()
      } catch (error) {
        console.error('Error loading session data:', error)
      }
    },
    getClassForSlot(day, timeSlot) {
      const dayClasses = this.timetableData[day] || []
      return dayClasses.find(classItem => classItem.time === timeSlot)
    },
    getClassStatus(day, timeSlot) {
      if (!this.isToday(day)) return ''
      
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      
      const [startTime, endTime] = timeSlot.split(' - ')
      const startMinutes = this.timeToMinutes(startTime)
      const endMinutes = this.timeToMinutes(endTime)
      
      if (currentTime < startMinutes - 30) return 'upcoming'
      if (currentTime >= startMinutes && currentTime <= endMinutes) return 'ongoing'
      if (currentTime > endMinutes) return 'completed'
      return ''
    },
    timeToMinutes(timeStr) {
      const [time, period] = timeStr.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      
      let totalMinutes = hours * 60 + minutes
      if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60
      if (period === 'AM' && hours === 12) totalMinutes = minutes
      
      return totalMinutes
    },
    isToday(day) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
      return today === day
    },
    getDateForDay(day) {
      const today = new Date()
      const currentDay = today.getDay()
      const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(day)
      
      const targetDate = new Date(today)
      targetDate.setDate(today.getDate() + (dayIndex - currentDay))
      
      return targetDate.getDate()
    },
    showClassDetails(classItem) {
      this.selectedClass = classItem
    },
    closeModal() {
      this.selectedClass = null
    },
    getLecturerInfo(courseCode) {
      const coursePrefix = courseCode.replace(/\d+$/, '')
      const currentSession = this.sessionData.sessions?.['Session 2024/2025'] || []
      const course = currentSession.find(c => c.code.startsWith(coursePrefix))
      return course?.lecturer || 'N/A'
    },
    exportTimetable() {
      window.print()
    }
  }
}
</script>

<style>
@import '@/styles/timetable.css';
</style>