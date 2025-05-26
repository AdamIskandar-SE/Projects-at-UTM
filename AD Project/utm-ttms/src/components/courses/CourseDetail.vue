<template>
  <div class="course-detail">
    <div class="detail-section">
      <h3 class="detail-title">Course Information</h3>
      <div class="detail-content">
        <p><strong>Course Code:</strong> {{ course.code }}</p>
        <p><strong>Course Name:</strong> {{ course.name }}</p>
        <p><strong>Credits:</strong> {{ course.credit }}</p>
        <p><strong>Section:</strong> {{ getSection(course.code) }}</p>
      </div>
    </div>

    <div class="detail-section">
      <h3 class="detail-title">Instructor Information</h3>
      <div class="detail-content">
        <p><strong>Lecturer:</strong> {{ course.lecturer }}</p>
      </div>
    </div>

    <div class="detail-section" v-if="course.venue">
      <h3 class="detail-title">Schedule Information</h3>
      <div class="detail-content">
        <p><strong>Venue:</strong> {{ course.venue }}</p>
        <div v-if="scheduleInfo">
          <p><strong>Schedule:</strong></p>
          <ul>
            <li v-for="schedule in scheduleInfo" :key="schedule.day">
              {{ schedule.day }}: {{ schedule.time }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <h3 class="detail-title">Course Description</h3>
      <div class="detail-content">
        <p>{{ getCourseDescription(course.name) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseDetail',
  props: {
    course: {
      type: Object,
      required: true
    },
    timetableData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    scheduleInfo() {
      const schedules = [];
      Object.keys(this.timetableData).forEach(day => {
        const daySchedules = this.timetableData[day];
        daySchedules.forEach(schedule => {
          if (schedule.course === this.getCourseCode(this.course.code)) {
            schedules.push({
              day: day,
              time: schedule.time
            });
          }
        });
      });
      return schedules.length > 0 ? schedules : null;
    }
  },
  methods: {
    getSection(code) {
      if (!code) return 'N/A';
      const parts = code.split(' - ');
      return parts.length > 1 ? parts[1] : 'N/A';
    },
    getCourseCode(fullCode) {
      if (!fullCode) return '';
      return fullCode.split(' - ')[0];
    },
    getCourseDescription(courseName) {
      const descriptions = {
        'Theory Of Computer Science': 'This course covers fundamental concepts in theoretical computer science including automata theory, formal languages, and computational complexity.',
        'Computer Network': 'Introduction to computer networking concepts, protocols, and network architecture. Covers OSI model, TCP/IP, routing, and network security.',
        'Computer Network Lab': 'Hands-on laboratory sessions for computer networking. Students will configure networks, implement protocols, and troubleshoot network issues.',
        'Applications Development': 'Comprehensive course on software application development covering design patterns, frameworks, and best practices for creating robust applications.',
        'High Performance & Parallel Computing': 'Advanced course covering parallel computing concepts, multi-threading, distributed computing, and optimization techniques for high-performance applications.',
        'Network Programming': 'Programming course focused on network-based applications, socket programming, client-server architecture, and distributed systems.',
        'Professional Communication Skills 1': 'Development of professional communication skills including written and oral communication, presentation skills, and business correspondence.'
      };
      
      return descriptions[courseName] || 'Course description not available.';
    }
  }
}
</script>