<template>
  <div class="course-list">
    <div class="course-filters">
      <div class="filter-group">
        <label class="filter-label">Filter by:</label>
        <select v-model="selectedFilter" class="filter-select" @change="applyFilter">
          <option value="all">All Courses</option>
          <option value="theory">Theory Courses</option>
          <option value="lab">Lab Courses</option>
          <option value="communication">Communication Courses</option>
        </select>
        
        <label class="filter-label">Sort by:</label>
        <select v-model="sortBy" class="filter-select" @change="applySorting">
          <option value="code">Course Code</option>
          <option value="name">Course Name</option>
          <option value="credit">Credits</option>
          <option value="lecturer">Lecturer</option>
        </select>
      </div>
    </div>

    <div class="course-count">
      Showing {{ filteredCourses.length }} of {{ allCourses.length }} courses
    </div>

    <div class="course-grid">
      <CourseCard
        v-for="course in paginatedCourses"
        :key="course.code"
        :course="course"
        @course-click="handleCourseClick"
      />
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button 
        @click="previousPage" 
        :disabled="currentPage === 1"
        class="btn btn-secondary"
      >
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="btn btn-secondary"
      >
        Next
      </button>
    </div>

    <Modal
      :isVisible="showModal"
      :title="selectedCourse?.name || 'Course Details'"
      @close="showModal = false"
    >
      <CourseDetail
        v-if="selectedCourse"
        :course="selectedCourse"
        :timetableData="timetableData"
      />
    </Modal>
  </div>
</template>

<script>
import Modal from '../common/Modal.vue'
import CourseCard from './CourseCard.vue'
import CourseDetail from './CourseDetail.vue'

export default {
  name: 'CourseList',
  components: {
    CourseCard,
    CourseDetail,
    Modal
  },
  props: {
    courses: {
      type: Array,
      default: () => []
    },
    timetableData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedFilter: 'all',
      sortBy: 'code',
      currentPage: 1,
      itemsPerPage: 6,
      showModal: false,
      selectedCourse: null
    }
  },
  computed: {
    allCourses() {
      return this.courses || [];
    },
    filteredCourses() {
      let filtered = [...this.allCourses];

      // Apply filter
      if (this.selectedFilter !== 'all') {
        filtered = filtered.filter(course => {
          switch (this.selectedFilter) {
            case 'theory':
              return !course.name.toLowerCase().includes('lab');
            case 'lab':
              return course.name.toLowerCase().includes('lab');
            case 'communication':
              return course.name.toLowerCase().includes('communication');
            default:
              return true;
          }
        });
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'credit':
            return b.credit - a.credit;
          case 'lecturer':
            return a.lecturer.localeCompare(b.lecturer);
          case 'code':
          default:
            return a.code.localeCompare(b.code);
        }
      });

      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCourses.slice(start, end);
    }
  },
  methods: {
    applyFilter() {
      this.currentPage = 1;
    },
    applySorting() {
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    handleCourseClick(course) {
      this.selectedCourse = course;
      this.showModal = true;
    }
  }
}
</script>

<style scoped>
.course-count {
  margin-bottom: 20px;
  color: #718096;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.page-info {
  color: #4a5568;
  font-weight: 500;
}

.pagination .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>