import Vue from 'vue'
import VueRouter from 'vue-router'
import SelectTool from '../views/SelectTool'
import MainCalss from '../views/MainCalss'
import PageNotFound from '../views/PageNotFound'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HOME',
    component: SelectTool
  },
  {
    path: '/taiwan/golf/maintain/backend',
    component: MainCalss,
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});


export default router;
