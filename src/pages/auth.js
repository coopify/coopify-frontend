import LoginImage from '../resources/img/seo/login.png';
import { Login } from '../components/login'

export default [
  {
    path: '/login',
    exact: true,
    component: Login,
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
    path: '/dashboard',
    exact: true,
    component: import('../components/dashboard'),
    seo: {
      title: 'User dashboard | ReactPWA Demo',
    },
  },
];
