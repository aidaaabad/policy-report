
import { FSMController } from './fsm/FSMController';
const binaryInput = '111101'; // Example binary input
const modulus = 5; // Example modulus

const fsmManager = new FSMController();

// Step 1: Initialize FSM with the input and modulus
const error = fsmManager.initializeFSM(modulus, binaryInput);
if (error) {
    console.error(error);
    process.exit(1);
}

// Step 2: Run FSM and get the final state
const finalState = fsmManager.runFSM(binaryInput);
console.log(`Final State: ${finalState}`);

