module.exports = {
  verbose: true,
  browser: false,
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    helperFunctions: "<rootDir>/src/client/js/helperFunctions.js",
    app: "<rootDir>/src/server/index.js",
    mockDB: "<rootDir>/src/server/mockDatabase.js",
  },
};
