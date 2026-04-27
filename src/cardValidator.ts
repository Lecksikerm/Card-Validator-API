export interface CardValidationResult {
    isValid: boolean;
    normalizedCardNumber?: string;
    reason?: string;
}

export function validateCardNumber(input: unknown): CardValidationResult {
    if (typeof input !== "string") {
        return {
            isValid: false,
            reason: "Card number must be a string"
        };
    }

    const normalizedCardNumber = input.replace(/[\s-]/g, "");

    if (normalizedCardNumber.length === 0) {
        return {
            isValid: false,
            reason: "Card number is required"
        };
    }

    if (!/^\d+$/.test(normalizedCardNumber)) {
        return {
            isValid: false,
            reason: "Card number must contain only digits, spaces, or hyphens"
        };
    }

    if (normalizedCardNumber.length < 12 || normalizedCardNumber.length > 19) {
        return {
            isValid: false,
            normalizedCardNumber,
            reason: "Card number must be between 12 and 19 digits"
        };
    }

    const isValid = passesLuhnCheck(normalizedCardNumber);

    return {
        isValid,
        normalizedCardNumber,
        reason: isValid ? undefined : "Card number failed validation check"
    };
}

function passesLuhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = Number(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}