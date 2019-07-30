import SplashImage from '../resources/img/seo/home-splash-screen.png';
import { Splash } from '../components/splash';

export default [
  {
    path: '/splash',
    exact: true,
    component: Splash,
    seo: {
      title: 'ReactPWA: A developer friendly ReactJS boilerplate | ReactPWA Demo',
      description: 'Create Upgradable, SEO friendly Progressive web applications with ReactPWA. Its fast and developer friendly and more importantly its UPGRADABLE!',
      image: SplashImage,
    },
  },
];
