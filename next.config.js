const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
});

/* module.exports = {
  images: {
    domains: ['maps.googleapis.com'],
  },
}; */

// Disable service workers for development: process.env.NODE_ENV === 'development'
// Activate service workers for testing and prod: false
