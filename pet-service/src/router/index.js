import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import MypageView from '@/views/MypageView.vue'
import PaymentTest from '@/components/paymentTest.vue'
import CodeManagementView from '@/views/CodeManagementView.vue'
import PetSitterListView from '@/views/PetSitterListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MypageView,
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentTest,
    },
    {
      path: '/codeManagement',
      name: 'codeManagement',
      component: CodeManagementView,
    },
    {
      path: '/pet-sitter',
      name: 'pet-sitter',
      component: PetSitterListView,
    },
  ],
})

export default router
