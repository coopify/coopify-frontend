import SplashImage from '../resources/img/seo/home-splash-screen.png';
import { Splash } from '../components/splash';

export default [
  {
    path: '/',
    exact: true,
    component: Splash,
    seo: {
      title: 'Coopify',
      description: 'Create Upgradable, SEO friendly Progressive web applications with ReactPWA. Its fast and developer friendly and more importantly its UPGRADABLE!',
      image: SplashImage,
    },
  },
];
