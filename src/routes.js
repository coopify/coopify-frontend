import GuestRoutes from './pages/guest';
import AuthRoutes from './pages/auth';
import SplashScreen from './pages/splash';
import LandingScreen from './pages/landing';

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    routeHandler.setPwaSchema({
      name: "Coopify- Service Exchange Platform",
      short_name: "Coopify",
      lang: "en-US",
      start_url: "/",
      display: "standalone",
      orientation: "portrait",
      theme_color: "#007bff",
      background_color: "#007bff"
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
