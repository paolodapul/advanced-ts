// Define the brand helper
declare const brand: unique symbol;
type Brand<T, TBrand> = T & { [brand]: TBrand };

// Define our branded types
type Password = Brand<string, "Password">;
type Email = Brand<string, "Email">;

// Validation errors
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Factory functions with validation
function createPassword(value: string): Password {
    if (value.length < 8) {
        throw new ValidationError('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(value)) {
        throw new ValidationError('Password must contain an uppercase letter');
    }
    if (!/[0-9]/.test(value)) {
        throw new ValidationError('Password must contain a number');
    }
    return value as Password;
}

function createEmail(value: string): Email {
    if (!value.includes('@')) {
        throw new ValidationError('Invalid email format');
    }
    return value as Email;
}

// Type guard functions
function isEmail(value: unknown): value is Email {
    return typeof value === 'string' && value.includes('@');
}

function isPassword(value: unknown): value is Password {
    return typeof value === 'string' 
        && value.length >= 8 
        && /[A-Z]/.test(value) 
        && /[0-9]/.test(value);
}

// Example usage
function login(email: Email, password: Password): void {
    // Type-safe login logic here
    console.log(`Logging in ${email} with password ${password}`);
}

// Usage examples
try {
    const email = createEmail('user@example.com');
    const password = createPassword('SecurePass123');
    
    login(email, password); // OK
    
    // These would cause compile-time errors:
    // login(password, email); // Error: Types don't match
    // login('user@example.com', 'password123'); // Error: Plain strings not assignable
    
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation failed:', error.message);
    }
}