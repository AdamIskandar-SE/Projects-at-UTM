const userState = {
  profile: {
    name: '',
    email: '',
    studentId: '',
    program: '',
    semester: ''
  },
  loading: false,
  error: null
};

const userMutations = {
  SET_PROFILE(state, profile) {
    state.profile = { ...state.profile, ...profile };
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  UPDATE_PROFILE_FIELD(state, { field, value }) {
    state.profile[field] = value;
  }
};

const userActions = {
  async fetchProfile({ commit }) {
    commit('SET_LOADING', true);
    try {
      const profile = {
        name: "AISYAH MAWADDAH BINTI MOHD RODUAN",
        email: "aisyah@graduate.utm.my",
        studentId: "MCS231234",
        program: "Master of Computer Science",
        semester: "Semester 2, 2024/2025"
      };
      commit('SET_PROFILE', profile);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateProfile({ commit }, profileData) {
    commit('SET_LOADING', true);
    try {
      commit('SET_PROFILE', profileData);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  updateProfileField({ commit }, { field, value }) {
    commit('UPDATE_PROFILE_FIELD', { field, value });
  }
};

const userGetters = {
  profile: state => state.profile,
  fullName: state => state.profile.name,
  email: state => state.profile.email,
  studentId: state => state.profile.studentId,
  isLoading: state => state.loading,
  error: state => state.error
};

export const userModule = {
  namespaced: true,
  state: userState,
  mutations: userMutations,
  actions: userActions,
  getters: userGetters
};