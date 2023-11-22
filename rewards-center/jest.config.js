module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/stake-unstake-pnft.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testTimeout: 10000,
  verbose: true,
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "tests", outputName: "out.xml" }],
    "github-actions",
  ],
};
