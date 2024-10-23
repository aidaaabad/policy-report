
export function FSMConfigForMod(modulus: number) {
    const states = new Set<string>();
    const transitions = new Map<string, Map<'0' | '1', string>>();

    for (let i = 0; i < modulus; i++) {
        const state = `S${i}`;
        states.add(state);

        const stateTransitions = new Map<'0' | '1', string>();
        stateTransitions.set('0', `S${(i * 2) % modulus}`);
        stateTransitions.set('1', `S${(i * 2 + 1) % modulus}`);
        transitions.set(state, stateTransitions);
    }

    return {
        states,
        initialState: 'S0',
        transitions,
        finalStates: states,
    };
}
