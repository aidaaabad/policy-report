// Purpose: Test for FSMConfigForMod function.
// Synopsis: Tests the FSMConfigForMod function to ensure that it generates the correct FSM configuration for a given modulus.

import { FSMConfigForMod } from '../src/fsm/FSMConfigForMod';

describe('generateFSMConfigForMod', () => {
    it('should generate the correct FSM configuration for modulus 3', () => {
        const modulus = 3;
        const config = FSMConfigForMod(modulus);

        // Check that the correct number of states is generated
        expect(config.states.size).toBe(modulus);
        expect(config.states.has('S0')).toBe(true);
        expect(config.states.has('S1')).toBe(true);
        expect(config.states.has('S2')).toBe(true);

        // Check the initial state
        expect(config.initialState).toBe('S0');

        // Check the transitions for each state
        expect(config.transitions.get('S0')?.get('0')).toBe('S0');
        expect(config.transitions.get('S0')?.get('1')).toBe('S1');

        expect(config.transitions.get('S1')?.get('0')).toBe('S2');
        expect(config.transitions.get('S1')?.get('1')).toBe('S0');

        expect(config.transitions.get('S2')?.get('0')).toBe('S1');
        expect(config.transitions.get('S2')?.get('1')).toBe('S2');

        // Check that all states are final states
        expect(config.finalStates.size).toBe(modulus);
        expect(config.finalStates.has('S0')).toBe(true);
        expect(config.finalStates.has('S1')).toBe(true);
        expect(config.finalStates.has('S2')).toBe(true);
    });

    it('should generate the correct FSM configuration for modulus 2', () => {
        const modulus = 2;
        const config = FSMConfigForMod(modulus);

        // Check that the correct number of states is generated
        expect(config.states.size).toBe(modulus);
        expect(config.states.has('S0')).toBe(true);
        expect(config.states.has('S1')).toBe(true);

        // Check the initial state
        expect(config.initialState).toBe('S0');

        // Check the transitions for each state
        expect(config.transitions.get('S0')?.get('0')).toBe('S0');
        expect(config.transitions.get('S0')?.get('1')).toBe('S1');

        expect(config.transitions.get('S1')?.get('0')).toBe('S0');
        expect(config.transitions.get('S1')?.get('1')).toBe('S1');

        // Check that all states are final states
        expect(config.finalStates.size).toBe(modulus);
        expect(config.finalStates.has('S0')).toBe(true);
        expect(config.finalStates.has('S1')).toBe(true);
    });

    it('should generate the correct FSM configuration for modulus 1', () => {
        const modulus = 1;
        const config = FSMConfigForMod(modulus);

        // Check that the correct number of states is generated
        expect(config.states.size).toBe(modulus);
        expect(config.states.has('S0')).toBe(true);

        // Check the initial state
        expect(config.initialState).toBe('S0');

        // Check the transitions for each state
        expect(config.transitions.get('S0')?.get('0')).toBe('S0');
        expect(config.transitions.get('S0')?.get('1')).toBe('S0');

        // Check that all states are final states
        expect(config.finalStates.size).toBe(modulus);
        expect(config.finalStates.has('S0')).toBe(true);
    });

    it('should generate the correct FSM configuration for modulus 5', () => {
        const modulus = 5;
        const config = FSMConfigForMod(modulus);

        // Check that the correct number of states is generated
        expect(config.states.size).toBe(modulus);
        expect(config.states.has('S0')).toBe(true);
        expect(config.states.has('S1')).toBe(true);
        expect(config.states.has('S2')).toBe(true);
        expect(config.states.has('S3')).toBe(true);
        expect(config.states.has('S4')).toBe(true);

        // Check the initial state
        expect(config.initialState).toBe('S0');

        // Check the transitions for each state
        expect(config.transitions.get('S0')?.get('0')).toBe('S0');
        expect(config.transitions.get('S0')?.get('1')).toBe('S1');

        expect(config.transitions.get('S1')?.get('0')).toBe('S2');
        expect(config.transitions.get('S1')?.get('1')).toBe('S3');

        expect(config.transitions.get('S2')?.get('0')).toBe('S4');
        expect(config.transitions.get('S2')?.get('1')).toBe('S0');

        expect(config.transitions.get('S3')?.get('0')).toBe('S1');
        expect(config.transitions.get('S3')?.get('1')).toBe('S2');

        expect(config.transitions.get('S4')?.get('0')).toBe('S3');
        expect(config.transitions.get('S4')?.get('1')).toBe('S4');

        // Check that all states are final states
        expect(config.finalStates.size).toBe(modulus);
        expect(config.finalStates.has('S0')).toBe(true);
        expect(config.finalStates.has('S1')).toBe(true);
        expect(config.finalStates.has('S2')).toBe(true);
        expect(config.finalStates.has('S3')).toBe(true);
        expect(config.finalStates.has('S4')).toBe(true);
    });

});
