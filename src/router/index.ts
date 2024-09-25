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
      path: '/current-students',
      name: 'current-students',
      component: () => import('@/views/SnacksView.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/past-students',
      name: 'past-students',
      component: () => import('@/views/LastOrders.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/teachers',
      name: 'teacher',
      component: () => import('@/views/AdminView.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/community',
      name: 'community',
      component: () => import('@/views/MoneyTable.vue'),
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

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        path: '/signin',
      }
    }
  }
})

export default router
