export function validateBinaryInput(input: string): boolean {
    return /^[01]+$/.test(input);
}

export function validateModulus(modulus: number): boolean {
    return Number.isInteger(modulus) && modulus > 1;
}
