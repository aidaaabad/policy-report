export class FSM<TState extends string, TInput> {
    private currentState: TState;

    constructor(
        private readonly states: Set<TState>,           // Q: Set of states
        private readonly alphabet: Set<TInput>,         // Σ: Input alphabet
        private readonly initialState: TState,          // q0: Initial state
        private readonly transitions: Map<TState, Map<TInput, TState>>, // δ: Transition function
        private readonly finalStates: Set<TState>       // F: Final/accepting states
    ) {
        // Validate FSM configuration during construction
        this.validateInitialState();   // Validate that q0 ∈ Q
        this.validateTransitions();    // Validate that δ: Q × Σ → Q
        this.validateFinalStates();    // Validate that F ⊆ Q

        // Initialize the current state
        this.currentState = this.initialState;
    }

    // Transition the FSM to the next state based on input
    public transition(input: TInput): void {
        const stateTransitions = this.transitions.get(this.currentState);

        if (!stateTransitions || !stateTransitions.has(input)) {
            throw new Error(
                `Invalid transition: No valid transition from state "${this.currentState}" with input "${input}"`
            );
        }

        // Safely update the current state
        this.currentState = stateTransitions.get(input)!;
    }

    // Reset the FSM to its initial state
    public reset(): void {
        this.currentState = this.initialState;
    }

    // Get the current state of the FSM
    public getCurrentState(): TState {
        return this.currentState;
    }

    // Check if the FSM is currently in a final/accepting state
    public isInFinalState(): boolean {
        return this.finalStates.has(this.currentState);
    }

    // Private method to validate the initial state
    // Ensure q0 ∈ Q
    private validateInitialState(): void {
        if (!this.states.has(this.initialState)) {
            throw new Error(
                `Invalid FSM configuration: Initial state "${this.initialState}" is not in the set of states`
            );
        }
    }

    // Private method to validate transitions
    // Ensure δ: Q × Σ → Q
    private validateTransitions(): void {
        for (const [state, transitionMap] of this.transitions.entries()) {
            if (!this.states.has(state)) {
                throw new Error(`Invalid FSM configuration: State "${state}" is not in the set of states`);
            }

            for (const [input, targetState] of transitionMap.entries()) {
                // Validate input is part of the alphabet Σ
                if (!this.alphabet.has(input)) {
                    throw new Error(
                        `Invalid FSM configuration: Input "${input}" is not part of the alphabet`
                    );
                }

                // Validate target state is part of the states Q
                if (!this.states.has(targetState)) {
                    throw new Error(
                        `Invalid FSM configuration: Target state "${targetState}" from state "${state}" with input "${input}" is not in the set of states`
                    );
                }
            }
        }
    }

    // Private method to validate final states
    // Ensure F ⊆ Q
    private validateFinalStates(): void {
        for (const finalState of this.finalStates) {
            if (!this.states.has(finalState)) {
                throw new Error(
                    `Invalid FSM configuration: Final state "${finalState}" is not in the set of states`
                );
            }
        }
    }
}
