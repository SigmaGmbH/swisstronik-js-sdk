module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/tests/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: "../../tsconfig.json"
    }
  },
  moduleNameMapper: {
    axios: "<rootDir>/node_modules/axios/dist/node/axios.cjs"
  }
};