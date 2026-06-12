export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'cnjm-postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 4,
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin',
      unitToConvert: 'px',
    },
  },
};
