module.exports = {
  coveragePathIgnorePatterns: ['./dist'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/dom'],
}
