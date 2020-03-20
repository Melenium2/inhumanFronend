import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(() => {
  let loader = document.getElementById('infinity')
  let loaderChrome = document.getElementById('infinityChorme')
  if (loader) loader.style.display = 'none'
  if (loaderChrome) loaderChrome.style.display = 'none'
})

export default router;
