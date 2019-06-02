
import FeaturesImage from '../resources/img/seo/features.png';
import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';

export default [
  {
    path: '/home',
    exact: true,
    component: import('../components/home'),
    seo: {
      title: 'Coopify',
      description: 'Feature set offered by ReactPWA with pluggable @pawjs plugins. ReactPWA is highly customizable and once can achieve anything as it is extendable',
      image: FeaturesImage,
    },
  },
  {
    path: '/global-local-css',
    exact: true,
    component: import('../components/global-local-css'),
    seo: {
      title: 'CSS - Globally & Locally | ReactPWA Demo',
      description: 'Sometimes we use global css classes like pad-10 but sometimes we need to write class names within modules that do not conflict with other modules, that is where local css comes into the picture',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/contribute',
    exact: true,
    component: import('../components/splash'),
    seo: {
      title: 'Contribute | ReactPWA Demo',
      description: 'Be a part of larger family. Get involved with us and support our project ReactPWA',
    },
  },
];
