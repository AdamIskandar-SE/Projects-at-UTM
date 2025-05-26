const state = {
  courses: [],
  sessionCourses: {},
  studentCourses: [],
  selectedSession: 'Session 2024/2025',
  loading: false,
  error: null
};

const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses;
  },
  SET_SESSION_COURSES(state, sessionCourses) {
    state.sessionCourses = sessionCourses;
  },
  SET_STUDENT_COURSES(state, studentCourses) {
    state.studentCourses = studentCourses;
  },
  SET_SELECTED_SESSION(state, session) {
    state.selectedSession = session;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  ADD_STUDENT_COURSE(state, course) {
    state.studentCourses.push(course);
  },
  REMOVE_STUDENT_COURSE(state, courseCode) {
    state.studentCourses = state.studentCourses.filter(
      course => course.code !== courseCode
    );
  }
};

const actions = {
  async fetchCourses({ commit }) {
    commit('SET_LOADING', true);
    try {
      // Simulate API call with mock data
      const courses = [
        { id: "SECD2523", course_name: "DATABASE", instructor_name: "Dr. Izzah" },
        { id: "SECR1213", course_name: "NETWORK COMMUNICATION", instructor_name: "Dr. Faiz" }
      ];
      commit('SET_COURSES', courses);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchSessionCourses({ commit }) {
    commit('SET_LOADING', true);
    try {
      const sessionCourses = {
        "Session 2024/2025": [
          { code: "SECR3203 - 07", name: "Theory Of Computer Science", credit: 3, lecturer: "Dr Ali", venue: "IT 1-12" },
          { code: "SECR2242 - 02", name: "Computer Network", credit: 3, lecturer: "Prof Bee", venue: "DK2" },
          { code: "SECJ2941 - 02", name: "Computer Network Lab", credit: 1, lecturer: "Mr Chan", venue: "Lab 3" },
          { code: "SECR3104 - 01", name: "Applications Development", credit: 4, lecturer: "Dr Razak", venue: "IT 2-11" },
          { code: "SECR3223 - 03", name: "High Performance & Parallel Computing", credit: 3, lecturer: "Dr Eva", venue: "Room 204" },
          { code: "SECR3253 - 01", name: "Network Programming", credit: 2, lecturer: "Ms Farah", venue: "Lab 1" },
          { code: "UHBL2122 - 53", name: "Professional Communication Skills 1", credit: 2, lecturer: "Mr Zaid", venue: "LT1" }
        ],
        "Session 2023/2024": [
          { code: "SECR3203 - 01", name: "Intro to Software Engineering", credit: 3, lecturer: "Dr Lee", venue: "Room 105" },
          { code: "SECR2223 - 02", name: "Database Systems", credit: 3, lecturer: "Dr Kim", venue: "Room 110" },
          { code: "SECJ2101 - 03", name: "Programming Lab 1", credit: 1, lecturer: "Ms Hana", venue: "Lab 2" }
        ]
      };
      commit('SET_SESSION_COURSES', sessionCourses);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchStudentCourses({ commit }) {
    commit('SET_LOADING', true);
    try {
      const studentCourses = [
        { code: "SECR3203 - 07", name: "Theory Of Computer Science", credit: 3 },
        { code: "SECR2242 - 02", name: "Computer Network", credit: 3 },
        { code: "SECJ2941 - 02", name: "Computer Network Lab", credit: 1 },
        { code: "SECR3104 - 01", name: "Application Development", credit: 4 },
        { code: "SECR3223 - 03", name: "High Performance & Parallel Computing", credit: 3 },
        { code: "SECR3253 - 01", name: "Network Programming", credit: 2 },
        { code: "UHBL2122 - 53", name: "Professional Communication Skills 1", credit: 2 }
      ];
      commit('SET_STUDENT_COURSES', studentCourses);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  enrollCourse({ commit }, course) {
    commit('ADD_STUDENT_COURSE', course);
  },

  dropCourse({ commit }, courseCode) {
    commit('REMOVE_STUDENT_COURSE', courseCode);
  },

  selectSession({ commit }, session) {
    commit('SET_SELECTED_SESSION', session);
  }
};

const getters = {
  allCourses: state => state.courses,
  sessionCourses: state => state.sessionCourses,
  studentCourses: state => state.studentCourses,
  selectedSession: state => state.selectedSession,
  currentSessionCourses: state => state.sessionCourses[state.selectedSession] || [],
  totalCredits: state => state.studentCourses.reduce((total, course) => total + course.credit, 0),
  coursesBySession: state => session => state.sessionCourses[session] || [],
  isLoading: state => state.loading,
  error: state => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};