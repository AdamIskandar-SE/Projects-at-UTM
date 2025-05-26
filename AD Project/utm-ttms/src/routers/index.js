import { useAuthStore } from '@/store/modules/auth'
import { createRouter, createWebHistory } from 'vue-router'

// Views
import About from '@/views/About.vue'
import Courses from '@/views/Courses.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import StudentCourses from '@/views/StudentCourses.vue'
import Timetable from '@/views/Timetable.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses,
    meta: { requiresAuth: true }
  },
  {
    path: '/student-courses',
    name: 'student-courses',
    component: StudentCourses,
    meta: { requiresAuth: true }
  },
  {
    path: '/timetable',
    name: 'timetable',
    component: Timetable,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    // Redirect authenticated users away from login
    next({ name: 'profile' })
  } else {
    next()
  }
})

export default router