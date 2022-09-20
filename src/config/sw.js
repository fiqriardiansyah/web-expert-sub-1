/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', () => {
  console.log('Service Worker: Pushed');
});

registerRoute(
  ({ url }) => url.pathname,
  new StaleWhileRevalidate(),
);
