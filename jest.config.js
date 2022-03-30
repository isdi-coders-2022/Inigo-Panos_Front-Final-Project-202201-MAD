module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/**.{ts,vue}',
    '!src/main.ts',
    '!src/registerServiceWorker.ts', // No need to cover bootstrap file
    '!src/store/**',
  ],
  // modulePathIgnorePatterns: ['!src/store', '!src/registerServiceWorker.ts'],
};
