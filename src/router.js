// import vuerouter and amplify
import { createWebHistory, createRouter } from "vue-router";
import { Auth } from 'aws-amplify';

// import page components
import Survey from './components/Survey';
import Home from './components/Home';
import AuthComponent from './components/Auth';
import Admin from './components/Admin';
import SurveyHome from './components/SurveyHome';
import Profile from './components/Profile';
import IAM from './components/IAM';

// define router rules
const routes = [
  { path: '/', component: Home },
  { path: '/survey/', component: SurveyHome },
  { path: '/survey/:survey', component: Survey },
  { path: '/auth/', component: AuthComponent },
  { path: '/admin/', component: Admin, meta: { requiresAuth: true } },
  { path: '/admin/:survey', component: Admin, meta: { requiresAuth: true } },
  { path: '/profile/', component: Profile, meta: { requiresAuth: true } },
  { path: '/iam/', component: IAM, meta: { requiresAuth: true } }
]

// create vue router with history
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// check for auth token
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser().then(() => {
      next()
    }).catch(() => {
      next({
        path: '/auth'
      });
    });
  } else {
    next()
  }
})

export default router;
