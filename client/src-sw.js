// Caching js and css requires workbox-strategies to be installed
// To actually respond to requests with a cached response, we need to use a strategy called StaleWhileRevalidate
// This strategy will first check the cache for a response, and if it finds one, it will return it.

import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// The precacheAndRoute() method takes an array of URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

// Here we give our cache a name
const cacheName = "static-resources";

// Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
const matchCallback = ({ request }) => {
  return (
    // CSS
    request.destination === "style" ||
    // JavaScript
    request.destination === "script"
  );
};

// The registerRoute() method takes three arguments:
// 1. A RegExp or string to match the URL against
// 2. A callback function that returns a response
// 3. An optional options object

registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
