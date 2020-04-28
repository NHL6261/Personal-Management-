import Vue from 'vue';
import VueRouter from 'vue-router';
const Login = () => import ('../components/Login.vue')
const Home = () => import ('../components/Home.vue')
const Department = () => import('../components/Department.vue')
const Position = () => import('../components/Position.vue')
const Staff = () => import('../components/Staff.vue')
const Welcome = () => import('../components/Welcome.vue')
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
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        name:'Welcome',
        component: Welcome
      },
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

// 路由守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径,from从哪个路径跳转而来,next 是一个函数表示放行 可以强制绑定跳转地址
  if(to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // const locslStr = window.localStorage.getItem('userinfo')
  // if(locslStr){
  //   next('/home')
  // }else{
  //   next('/login')
  // }
  // 判断是否有token 如果没有直接跳转到 login页面
  if(!tokenStr) return next('/login')
  // 如果有就直接放行
  next()
})
export default router;
