import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import SearchPage from "@/pages/SearchPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import LogIn from "@/pages/LogIn.vue";
import SignUp from "@/pages/SignUp.vue";
import CreatePage from "@/pages/CreatePage.vue";
import EditPage from "@/pages/EditPage.vue";
import EditAccount from "@/pages/EditAccount.vue";
import { store } from "@/store";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/explore",
    component: SearchPage,
  },
  {
    path: "/reels",
    component: SearchPage,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/message",
    component: SearchPage,
  },
  {
    path: "/heart",
    component: SearchPage,
  },
  {
    path: "/create",
    component: CreatePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit/:id",
    component: EditPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/accounts/setting",
    component: EditAccount,
    meta: { requiresAuth: true }
  },
  {
    path: "/more",
    component: SearchPage,
  },
  {
    path: '/log-in',
    component: LogIn
  },
  {
    path: '/sign-up',
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if(to.meta.requiresAuth && !isAuthenticated) next({ path: '/log-in' })
  else next();
})

export default router;
