module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
      'pooppink-dark': '#F53072',
      'pooppink-light': '#FF8EBD',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
