// eslint-disable-next-line
const bgSyncPlugin = new self.workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

self.workbox.routing.registerRoute(
  /\/api\/v3\/run/,
  self.workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

self.addEventListener('fetch', (event) => {
    console.log(event)
});