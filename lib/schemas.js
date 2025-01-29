import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .refine(
      (value) => {
        // Regular expressions to check if value is an email or a phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0\d{9}$/; // Matches a 10-digit number starting with '0'

        // Check if the value matches either email or phone format
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: 'Username must be a valid email or phone number',
      }
    ),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .trim(),
});
