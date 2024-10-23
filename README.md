# Policy Report App

This project uses **React** and **TypeScript** to create an FSM-based (Finite State Machine) application for handling binary input and moduli-based transitions.

## Project Structure
```bash
policy-report/
│
├── public/
│   └── (standard public folder for static assets)
│
├── src/
│   ├── fsm/
│   │   ├── FSM.ts                     # Defines the FSM class, including states, transitions, and methods for managing the state machine.
│   │   ├── FSMConfigForMod.ts          # A utility that generates FSM configurations for various modulus values (e.g., Mod-3, Mod-5).
│   │   ├── FSMController.ts            # Manages the initialization and execution of the FSM based on input and configuration.
│   │   └── validators.ts               # Contains helper functions for validating inputs, such as binary strings and modulus values.
│   │
│   ├── tests/
│   │   ├── FSM.test.ts                 # Unit tests for the `FSM.ts` file, covering state transitions, error handling, and other behavior.
│   │   ├── FSMConfigForMod.test.ts     # Tests for generating FSM configurations based on different modulus values.
│   │   └── FSMValidationTests.test.ts  # Unit tests for validating inputs (e.g., binary strings, modulus values).
│   │
│   ├── App.tsx                         # Main React component and entry point of the application
│   ├── index.ts                        # Entry point for rendering the app into the DOM
│  
│
├── .gitignore                          # Specifies files and directories to be ignored by Git, such as `node_modules` or build files.
├── jest.config.js                      # Configuration for the Jest testing framework, used to run unit tests
├── package.json                        # Manages dependencies, project metadata, and NPM scripts (e.g., `npm start`, `npm test`).
├── tsconfig.json                       # TypeScript configuration for compiling TypeScript files
└── README.md                           # Project documentation
```



### **`/src/fsm/`**
This folder contains the FSM (Finite State Machine) logic and supporting utilities.
### **`/src/tests/`**
This folder contains unit tests for the FSM logic, configuration, and validation.



## Available Scripts

In the project directory, you can run the following commands:
### `npm install`

Installs all necessary dependencies defined in the `package.json` file. Run this command before starting or testing the app for the first time.
### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make changes to the code.

### `npm test`

Launches the test runner in interactive watch mode. This will run unit tests on the FSM, its configuration, and validation logic.

### `npm run build`

Builds the app for production into the `build` folder. The production build is optimized and ready to be deployed.

## Learn More

For more information about how to use or extend this project, refer to the following resources:

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)


