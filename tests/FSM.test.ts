// Purpose: Test cases for FSM class.
// Tests the FSM class for correct initialization, transitions, and error handling.
import { FSM } from '../src/fsm/FSM';
// Define a random FSM configuration (based on Mod-N)-only test FSM transitions and final state
describe('FSM', () => {
    let fsm: FSM<string, number>;

    beforeEach(() => {
        // Mod-Three FSM example configuration
        const states = new Set(['S0', 'S1', 'S2']);
        const alphabet = new Set([0, 1]);
        const transitions = new Map<string, Map<number, string>>([
            ['S0', new Map([[0, 'S0'], [1, 'S1']])],
            ['S1', new Map([[0, 'S2'], [1, 'S0']])],
            ['S2', new Map([[0, 'S1'], [1, 'S2']])]
        ]);
        const finalStates = new Set(['S0', 'S1', 'S2']);
        // Initialize FSM
        fsm = new FSM(states, alphabet, 'S0', transitions, finalStates);
    });

    it('should initialize in the correct initial state', () => {
        expect(fsm.getCurrentState()).toBe('S0');
    });

    it('should transition correctly on valid input', () => {
        fsm.transition(1);
        expect(fsm.getCurrentState()).toBe('S1');

        fsm.transition(0);
        expect(fsm.getCurrentState()).toBe('S2');
    });

    it('should throw an error on invalid input for a state', () => {
        expect(() => fsm.transition(2)).toThrowError(
            'Invalid transition: No valid transition from state "S0" with input "2"'
        );
    });

    it('should throw an error if transition is undefined for the state-input pair', () => {
        fsm.transition(1); // Move to S1
        expect(fsm.getCurrentState()).toBe('S1');

        expect(() => fsm.transition(5)).toThrowError(
            'Invalid transition: No valid transition from state "S1" with input "5"'
        );
    });

    it('should reset to the initial state after calling reset()', () => {
        fsm.transition(1); // Move to S1
        fsm.transition(0); // Move to S2
        expect(fsm.getCurrentState()).toBe('S2');

        // Reset the FSM to initial state
        fsm.reset();
        expect(fsm.getCurrentState()).toBe('S0');
    });

    it('should correctly identify when it is in a final state', () => {
        fsm.transition(1); // Move to S1
        expect(fsm.isInFinalState()).toBe(true); // S1 is a final state

        fsm.transition(0); // Move to S2
        expect(fsm.isInFinalState()).toBe(true); // S2 is a final state
    });

    it('should throw an error when invalid initial state is given', () => {
        expect(() => {
            const invalidFSM = new FSM(
                new Set(['S0', 'S1']),
                new Set([0, 1]), // Alphabet
                'S3', // Invalid initial state
                new Map<string, Map<number, string>>(),
                new Set(['S0'])
            );
        }).toThrowError('Invalid FSM configuration: Initial state "S3" is not in the set of states');
    });

    it('should throw an error when transitions contain invalid target states', () => {
        expect(() => {
            const invalidTransitions = new Map<string, Map<number, string>>([
                ['S0', new Map([[0, 'S0'], [1, 'S3']])], // 'S3' does not exist
                ['S1', new Map([[0, 'S2'], [1, 'S0']])]
            ]);

            const invalidFSM = new FSM(
                new Set(['S0', 'S1', 'S2']),
                new Set([0, 1]), // Alphabet
                'S0',
                invalidTransitions,
                new Set(['S0', 'S1', 'S2'])
            );
        }).toThrowError('Invalid FSM configuration: Target state "S3" from state "S0" with input "1" is not in the set of states');
    });

    it('should correctly handle transitions and remain in valid states', () => {
        fsm.transition(1); // S0 -> S1
        expect(fsm.getCurrentState()).toBe('S1');
        fsm.transition(0); // S1 -> S2
        expect(fsm.getCurrentState()).toBe('S2');
        fsm.transition(1); // S2 -> S2
        expect(fsm.getCurrentState()).toBe('S2');
    });

    it('should throw an error if invalid transitions map is provided', () => {
        const invalidTransitions = new Map<string, Map<number, string>>([
            ['S0', new Map([[0, 'S0'], [2, 'S1']])], // '2' is not in the alphabet {0, 1}
            ['S1', new Map([[0, 'S2'], [1, 'S0']])]
        ]);

        expect(() => {
            new FSM(
                new Set(['S0', 'S1', 'S2']),
                new Set([0, 1]), // Alphabet
                'S0',
                invalidTransitions,
                new Set(['S0', 'S1', 'S2'])
            );
        }).toThrowError('Invalid FSM configuration: Input "2" is not part of the alphabet');
    });
});
// Define a random FSM configuration (not based on Mod-N)-only test FSM transitions and final state
describe('FSM - Random Configuration Test with Custom Alphabet', () => {
    it('should process random FSM configuration correctly with custom alphabet', () => {
        // Define an FSM configuration with alphabet ['0', '1', 'a']
        const states = new Set(['A', 'B', 'C', 'D']);
        const alphabet = new Set(['0', '1', 'a']);

        const transitions = new Map<string, Map<'0' | '1' | 'a', string>>([
            ['A', new Map([['0', 'B'], ['1', 'C'], ['a', 'D']])],
            ['B', new Map([['0', 'A'], ['1', 'D'], ['a', 'C']])],
            ['C', new Map([['0', 'D'], ['1', 'A'], ['a', 'B']])],
            ['D', new Map([['0', 'C'], ['1', 'B'], ['a', 'A']])]
        ]);

        const initialState = 'A';
        const finalStates = new Set(['B', 'C']); // Final states

        // Instantiate the FSM
        const fsm = new FSM(states, alphabet, initialState, transitions, finalStates);

        // Test FSM transitions and final state with the custom alphabet
        fsm.transition('1'); // A -> C
        expect(fsm.getCurrentState()).toBe('C');

        fsm.transition('a'); // C -> B
        expect(fsm.getCurrentState()).toBe('B');

        fsm.transition('0'); // B -> A
        expect(fsm.getCurrentState()).toBe('A');

        fsm.transition('a'); // A -> D
        expect(fsm.getCurrentState()).toBe('D');

        // Test resetting FSM
        fsm.reset();
        expect(fsm.getCurrentState()).toBe('A');

        // Test processing a sequence of inputs
        fsm.transition('0'); // A -> B
        fsm.transition('1'); // B -> D
        fsm.transition('a'); // D -> A
        expect(fsm.getCurrentState()).toBe('A');

        // Check if final state is correct
        expect(fsm.isInFinalState()).toBe(false); // A is not a final state
    });
});