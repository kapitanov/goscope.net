/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: '.output', outputName: 'test-results.xml' }],
    ['github-actions', { silent: false }],
    'summary'
  ]
};
