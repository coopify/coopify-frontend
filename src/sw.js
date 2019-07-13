
var customNetworkFirst = self.workbox.strategies.networkFirst({
  cacheName: 'cache-requests' 
});

const customHandler = async (args) => {
  try {
    const response = await customNetworkFirst.handle(args);
    return response || await caches.match(args.route);
  } catch (error) {
    return new Response()
  }
};

self.workbox.routing.registerRoute(
  new RegExp('https://coopify-dev-backend.herokuapp.com/api/.*'),
  customHandler,
)