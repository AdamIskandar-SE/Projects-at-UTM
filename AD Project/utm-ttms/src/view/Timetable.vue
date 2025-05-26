<template>
  <div class="timetable-container-wrapper">
    <div class="content-header">
      <h1>Weekly Timetable</h1>
      <p>Your complete schedule for the current academic session</p>
    </div>
    
    <div class="content-card">
      <div class="timetable-container">
        <table class="timetable">
          <thead>
            <tr>
              <th>Time</th>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeSlot in timeSlots" :key="timeSlot">
              <td class="time-slot">{{ timeSlot }}</td>
              <td v-for="day in days" :key="day" class="timetable-slot">
                <div v-if="getClassForTimeAndDay(timeSlot, day)" class="class-block">
                  <div class="class-code">
                    {{ getClassForTimeAndDay(timeSlot, day).course }}-{{ getClassForTimeAndDay(timeSlot, day).section }}
                  </div>
                  <div class="class-name">
                    {{ getClassForTimeAndDay(timeSlot, day).courseName }}
                  </div>
                  <div class="class-venue">
                    📍 {{ getClassForTimeAndDay(timeSlot, day).venue }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="content-card">
      <h2 class="section-title">Schedule Summary</h2>
      <div class="schedule-summary">
        <div class="summary-stats">
          <div class="stat-item">
            <span class="stat-number">{{ totalClasses }}</span>
            <span class="stat-label">Total Classes</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ uniqueCourses }}</span>
            <span class="stat-label">Unique Courses</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ busiestDay }}</span>
            <span class="stat-label">Busiest Day</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timetableData from '@/data/timetableData.json'

export default {
  name: 'Timetable',
  data() {
    return {
      timetableData,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: [
        '8:00 AM - 10:00 AM',
        '10:00 AM - 12:00 PM',
        '12:00 PM - 2:00 PM',
        '2:00 PM - 4:00 PM',
        '4:00 PM - 6:00 PM'
      ]
    }
  },
  computed: {
    totalClasses() {
      return Object.values(this.timetableData).flat().length
    },
    uniqueCourses() {
      const courses = new Set()
      Object.values(this.timetableData).flat().forEach(cls => {
        courses.add(cls.course)
      })
      return courses.size
    },
    busiestDay() {
      let maxClasses = 0
      let busiest = ''
      
      const dayMap = {
        'Mon': 'Monday',
        'Tue': 'Tuesday', 
        'Wed': 'Wednesday',
        'Thu': 'Thursday',
        'Fri': 'Friday'
      }
      
      Object.entries(this.timetableData).forEach(([day, classes]) => {
        if (classes.length > maxClasses) {
          maxClasses = classes.length
          busiest = dayMap[day] || day
        }
      })
      
      return busiest || 'Monday'
    }
  },
  methods: {
    getClassForTimeAndDay(timeSlot, day) {
      const dayKey = day.substring(0, 3)
      const dayClasses = this.timetableData[dayKey] || []
      
      return dayClasses.find(cls => {
        // Normalize time format for comparison
        const classTime = cls.time.replace(/\s+/g, ' ').trim()
        const slotTime = timeSlot.replace(/\s+/g, ' ').trim()
        return classTime === slotTime
      })
    }
  }
}
</script>

<style scoped>
.timetable-container-wrapper {
  width: 100%;
}

.schedule-summary {
  margin-top: 1rem;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  background: var(--light-bg);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--secondary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>