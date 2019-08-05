import GuestRoutes from './pages/guest';
import AuthRoutes from './pages/auth';
import SplashScreen from './pages/splash';
import LandingScreen from './pages/landing';
import PwaIcon192 from './resources/img/pwa-icon-192.png';
import PwaIcon512 from './resources/img/pwa-icon-512.png';

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    routeHandler.setPwaSchema({
      name: 'Coopify- Service Exchange Platform',
      short_name: 'Coopify',
      lang: 'en-US',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
      theme_color: '#4a4a4a',
      background_color: '#fafafa',
      icons: [
        {
          src: PwaIcon192,
          sizes: '192x192',
        },
        {
          src: PwaIcon512,
          sizes: '512x512',
        },
      ],
    });
    routeHandler.setDefaultSeoSchema({
      title: 'ReactPWA',
    });

    const routes = [
      ...GuestRoutes,
      ...AuthRoutes,
      ...SplashScreen,
      ...LandingScreen,
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
