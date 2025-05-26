const timetableState = {
  timetable: {},
  selectedDay: 'Mon',
  loading: false,
  error: null
};

const timetableMutations = {
  SET_TIMETABLE(state, timetable) {
    state.timetable = timetable;
  },
  SET_SELECTED_DAY(state, day) {
    state.selectedDay = day;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  ADD_TIMETABLE_ENTRY(state, { day, entry }) {
    if (!state.timetable[day]) {
      state.timetable[day] = [];
    }
    state.timetable[day].push(entry);
  },
  REMOVE_TIMETABLE_ENTRY(state, { day, timeSlot }) {
    if (state.timetable[day]) {
      state.timetable[day] = state.timetable[day].filter(
        entry => entry.time !== timeSlot
      );
    }
  },
  UPDATE_TIMETABLE_ENTRY(state, { day, oldTimeSlot, newEntry }) {
    if (state.timetable[day]) {
      const index = state.timetable[day].findIndex(entry => entry.time === oldTimeSlot);
      if (index !== -1) {
        state.timetable[day][index] = newEntry;
      }
    }
  }
};

const timetableActions = {
  async fetchTimetable({ commit }) {
    commit('SET_LOADING', true);
    try {
      const timetable = {
        "Mon": [
          { time: "8:00 AM - 10:00 AM", course: "UHBL2122", section: "53", courseName: "Professional Communication Skills 1", venue: "N28a BT4" },
          { time: "2:00 PM - 4:00 PM", course: "SECR2242", section: "02", courseName: "Computer Network", venue: "N28 CSL" }
        ],
        "Tue": [
          { time: "8:00 AM - 10:00 AM", course: "SECR3104", section: "01", courseName: "Application Development", venue: "CGMTL" },
          { time: "2:00 PM - 4:00 PM", course: "SECR2345", section: "02", courseName: "Operating Systems", venue: "N28 CSL" }
        ],
        "Wed": [
          { time: "8:00 AM - 10:00 AM", course: "SECR3104", section: "01", courseName: "Application Development", venue: "MPK 3" },
          { time: "10:00 AM - 11:30 AM", course: "SECR2010", section: "01", courseName: "Data Structures", venue: "N28 BT2" },
          { time: "2:00 PM - 3:30 PM", course: "SECR3010", section: "05", courseName: "Algorithms", venue: "N28 BT3" }
        ],
        "Thu": [
          { time: "11:00 AM - 1:00 PM", course: "UHBL3344", section: "04", courseName: "Advanced Communication", venue: "N28a BT2" }
        ],
        "Fri": [
          { time: "8:00 AM - 10:00 AM", course: "SECR1122", section: "05", courseName: "Cyber Security", venue: "N28 CSL" }
        ]
      };
      commit('SET_TIMETABLE', timetable);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  selectDay({ commit }, day) {
    commit('SET_SELECTED_DAY', day);
  },

  addTimetableEntry({ commit }, { day, entry }) {
    commit('ADD_TIMETABLE_ENTRY', { day, entry });
  },

  removeTimetableEntry({ commit }, { day, timeSlot }) {
    commit('REMOVE_TIMETABLE_ENTRY', { day, timeSlot });
  },

  updateTimetableEntry({ commit }, { day, oldTimeSlot, newEntry }) {
    commit('UPDATE_TIMETABLE_ENTRY', { day, oldTimeSlot, newEntry });
  }
};

const timetableGetters = {
  timetable: state => state.timetable,
  selectedDay: state => state.selectedDay,
  selectedDaySchedule: state => state.timetable[state.selectedDay] || [],
  allDays: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  isLoading: state => state.loading,
  error: state => state.error,
  getScheduleByDay: state => day => state.timetable[day] || []
};

export const timetableModule = {
  namespaced: true,
  state: timetableState,
  mutations: timetableMutations,
  actions: timetableActions,
  getters: timetableGetters
};