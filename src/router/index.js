import Vue from 'vue'
import VueRouter from 'vue-router'
import SelectTool from '../views/SelectTool'
import Report from '../views/Report'
import Maintain from '../views/Maintain'
import PageNotFound from '../views/PageNotFound'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HOME',
    component: SelectTool
  },
  {
    path: '/taiwan/golf/backend/report',
    component: Report,
  },
  {
    path: '/taiwan/golf/backend/maintain',
    component: Maintain,
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});


export default router;
