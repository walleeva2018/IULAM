import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/current-teachers',
      name: 'current-teachers',
      component: () => import('@/views/CurrentTeachers.vue'),
    },
    {

      path: '/past-teachers',
      name: 'past-teachers',
      component: () => import('@/views/PastTeachers.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/current-students',
      name: 'current-students',
      component: () => import('@/views/CurrentStudents.vue'),
    },
    {

      path: '/past-students',
      name: 'past-students',
      component: () => import('@/views/PastStudents.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/CommunityView.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/admin/edit',
      name: 'edit',
      component: () => import('@/views/EditView.vue'),
    },
    {
      meta: { requiresAuth: false },
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/about-me',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      meta: { requiresAuth: false },
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2)
    return parts?.pop()?.split(';').shift()
  return null
}

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const authToken = getCookie('authToken')
    if (!authToken) {
      return {
        path: '/signin',
      }
    }
  }
})

export default router
