import {FSM} from './FSM';
import {FSMConfigForMod} from './FSMConfigForMod';
import {validateBinaryInput, validateModulus} from './validators';

export class FSMController {
    private fsm: FSM<string, '0' | '1'> | null = null;
       // Method to set up the FSM based on the modulus and input
    public initializeFSM(modulus: number, binaryInput: string): string | null {
        // Validate the modulus
        if (!validateModulus(modulus)) {
            return 'Invalid modulus. Please enter a positive integer greater than 1.';
        }

        // Validate the binary input
        if (!validateBinaryInput(binaryInput)) {
            return 'Invalid input. Only binary digits (0 and 1) are allowed.';
        }

        // Configure the FSM using the validated modulus
        const config = FSMConfigForMod(modulus);
        this.fsm = new FSM(
            config.states,
            new Set(['0', '1']),  // Input alphabet for binary FSM
            config.initialState,
            config.transitions,
            config.finalStates
        );
             return null; // No errors, proceed
    }

    // Method to run the FSM and return the final state
    public runFSM(binaryInput: string): string {
        if (!this.fsm) {
            throw new Error('FSM not initialized. Call initializeFSM first.');
        }

        // Reset FSM to the initial state
        this.fsm.reset();

        // Process each bit in the binary input
        for (let bit of binaryInput) {
            this.fsm.transition(bit as '0' | '1');
        }

        // Return the final state
        return this.fsm.getCurrentState();
    }
}
