// Purpose: to test the FSM validators.
// Synopsis: Tests the FSM validators to ensure that they correctly validate binary input and modulus.
import { validateBinaryInput, validateModulus } from '../src/fsm/validators';

describe('Input Validation Tests', () => {
    it('should validate binary input correctly', () => {
        expect(validateBinaryInput('110')).toBe(true);
        expect(validateBinaryInput('0')).toBe(true);
        expect(validateBinaryInput('102')).toBe(false);
        expect(validateBinaryInput('')).toBe(false);
        expect(validateBinaryInput('1,0')).toBe(false);
        expect(validateBinaryInput('1adc0')).toBe(false);

    });

    it('should validate modulus correctly', () => {
        expect(validateModulus(3)).toBe(true);
        expect(validateModulus(0)).toBe(false);
        expect(validateModulus(-1)).toBe(false);
    });
});