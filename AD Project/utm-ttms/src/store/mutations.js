// src/store/mutations.js

// Global mutations that affect the entire application state
export const SET_LOADING = (state, loading) => {
  state.loading = loading;
};

export const SET_ERROR = (state, error) => {
  state.error = error;
};

export const CLEAR_ERROR = (state) => {
  state.error = null;
};

export const SET_SUCCESS_MESSAGE = (state, message) => {
  state.successMessage = message;
};

export const CLEAR_SUCCESS_MESSAGE = (state) => {
  state.successMessage = null;
};

export const SET_THEME = (state, theme) => {
  state.theme = theme;
};

export const TOGGLE_SIDEBAR = (state) => {
  state.sidebarOpen = !state.sidebarOpen;
};

export const SET_SIDEBAR = (state, isOpen) => {
  state.sidebarOpen = isOpen;
};

export const SET_CURRENT_ROUTE = (state, route) => {
  state.currentRoute = route;
};

export const SET_BREADCRUMBS = (state, breadcrumbs) => {
  state.breadcrumbs = breadcrumbs;
};

export const SET_NOTIFICATION = (state, notification) => {
  state.notifications.push({
    id: Date.now(),
    ...notification,
    timestamp: new Date()
  });
};

export const REMOVE_NOTIFICATION = (state, notificationId) => {
  state.notifications = state.notifications.filter(
    notification => notification.id !== notificationId
  );
};

export const CLEAR_ALL_NOTIFICATIONS = (state) => {
  state.notifications = [];
};

export const SET_APP_VERSION = (state, version) => {
  state.appVersion = version;
};

export const SET_ONLINE_STATUS = (state, isOnline) => {
  state.isOnline = isOnline;
};

export const SET_LAST_SYNC = (state, timestamp) => {
  state.lastSync = timestamp;
};

export const INCREMENT_REQUEST_COUNT = (state) => {
  state.requestCount++;
};

export const DECREMENT_REQUEST_COUNT = (state) => {
  if (state.requestCount > 0) {
    state.requestCount--;
  }
};

export const RESET_REQUEST_COUNT = (state) => {
  state.requestCount = 0;
};

export const SET_USER_PREFERENCES = (state, preferences) => {
  state.userPreferences = { ...state.userPreferences, ...preferences };
};

export const UPDATE_USER_PREFERENCE = (state, { key, value }) => {
  state.userPreferences[key] = value;
};

export const SET_MODAL_STATE = (state, { modalName, isOpen, data = null }) => {
  if (!state.modals[modalName]) {
    state.modals[modalName] = {};
  }
  state.modals[modalName].isOpen = isOpen;
  state.modals[modalName].data = data;
};

export const CLOSE_ALL_MODALS = (state) => {
  Object.keys(state.modals).forEach(modalName => {
    state.modals[modalName].isOpen = false;
    state.modals[modalName].data = null;
  });
};

export default {
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_SUCCESS_MESSAGE,
  CLEAR_SUCCESS_MESSAGE,
  SET_THEME,
  TOGGLE_SIDEBAR,
  SET_SIDEBAR,
  SET_CURRENT_ROUTE,
  SET_BREADCRUMBS,
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATIONS,
  SET_APP_VERSION,
  SET_ONLINE_STATUS,
  SET_LAST_SYNC,
  INCREMENT_REQUEST_COUNT,
  DECREMENT_REQUEST_COUNT,
  RESET_REQUEST_COUNT,
  SET_USER_PREFERENCES,
  UPDATE_USER_PREFERENCE,
  SET_MODAL_STATE,
  CLOSE_ALL_MODALS
};