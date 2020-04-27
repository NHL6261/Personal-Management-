import Vue from 'vue';
import VueRouter from 'vue-router';
const Login = () => import ('../components/Login.vue')
const Home = () => import ('../components/Home.vue')
const Department = () => import('../components/Department.vue')
const Position = () => import('../components/Position.vue')
const Staff = () => import('../components/Staff.vue')
Vue.use(VueRouter);
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/department',
        name: 'Department',
        component: Department,
      },
      {
        path:'/position',
        name:'Position',
        component:Position
      },
      {
        path:'/staff',
        name:'Staff',
        component:Staff
      }
    ]
  },
  
  {
    path:'/',
    redirect:'/login'
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
