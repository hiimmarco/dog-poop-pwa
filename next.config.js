const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: false,
    register: true,
    skipWaiting: true,
  },
});

module.exports = {
  images: {
    domains: ['maps.googleapis.com'],
  },
};

// Disable service workers for development: process.env.NODE_ENV === 'development'
// Activate service workers for testing and prod: false
