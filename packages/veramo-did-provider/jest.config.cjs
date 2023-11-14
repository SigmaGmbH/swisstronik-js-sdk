// jest.config.js
module.exports = {
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "jsonld"],
    "extensionsToTreatAsEsm": [".ts"],
    "testMatch": ["**/tests/**/*.test.*"],
    "transform": {
        "^.+\\.m?tsx?$": ["ts-jest", {
            "useESM": true, "tsconfig": "./tsconfig.test.json"
        }]
    },
    "testEnvironment": "node",
    "modulePathIgnorePatterns": ["tests/testutils.test.ts"]
};
