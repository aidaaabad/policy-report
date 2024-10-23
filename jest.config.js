module.exports = {
    preset: 'ts-jest',                   // Ensure TypeScript is used
    testEnvironment: 'node',             // Use Node.js environment
    testMatch: [                         // Ensure this pattern matches your test files
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"   // Looks for *.test.ts, *.test.tsx, *.spec.ts, *.spec.tsx
    ],
    testPathIgnorePatterns: ['\\node_modules\\', '\\dist\\'],
    collectCoverage: true,
};
