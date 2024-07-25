import { z } from 'zod';

const loginSchema = z.object({
    email: z.string()
        .email({ message: 'Invalid email format' })
        .trim(),
        
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(50, { message: 'Password cannot exceed 50 characters' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, { message: 'Password must contain at least one letter and one number' })
});

const signupSchema = loginSchema.extend({
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(50, { message: 'Username cannot exceed 50 characters' })
        .regex(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers, and underscores' })
        .trim(),
    
    phone: z.string()
        .length(10, { message: 'Phone number must be exactly 10 characters long' })
        .regex(/^\d{10}$/, { message: 'Phone number can only contain digits' })
        .trim(),
});

export {
    signupSchema,
    loginSchema,
};