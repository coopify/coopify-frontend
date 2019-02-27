import LoginImage from '../resources/img/seo/login.png';
import { Login } from '../components/login'
import { Signup } from '../components/signup'
import{ FacebookSignUp } from '../components/facebookSignUp';
import { GoogleSignUp } from '../components/googleSignUp';
import {Profile} from '../components/profile';

export default [
  {
    path: '/login',
    exact: true,
    component: Login,
    seo: {
      title: 'User login',
      image: LoginImage,
    },
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
    seo: {
      title: 'Traditional signup',
      image: LoginImage,
    },
  },
  {
    path: '/facebook/signup',
    exact: true,
    component: FacebookSignUp,
    seo: {
      title: 'Facebook signup',
      image: LoginImage,
    },
  },
  {
    path: '/google/signup',
    exact: true,
    component: GoogleSignUp,
    seo: {
      title: 'Google signup',
      image: LoginImage,
    },
  },
  {
    path: '/user/profile',
    exact: true,
    component: Profile,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'Implementing Auth with ReactPWA is simple. Check out this fake auth example for more details',
      image: LoginImage,
    },
  },
  {
    path: '/logout',
    exact: true,
    component: import('../components/logout'),
    seo: {
      title: 'Logging out...',
    },
  },
  {
    path: '/home',
    exact: true,
    component: import('../components/home'),
    seo: {
      title: 'User homerpage',
    },
  },
];
