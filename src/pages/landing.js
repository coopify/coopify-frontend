import SplashImage from '../resources/img/seo/home-splash-screen.png';

export default [
  {
    path: '/',
    exact: true,
    component: import('../components/splash'),
    seo: {
      title: 'Mi landing',
      description: 'Create Upgradable, SEO friendly Progressive web applications with ReactPWA. Its fast and developer friendly and more importantly its UPGRADABLE!',
      image: SplashImage,
    },
  },
];
