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

export const staffSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .trim()
    .min(1, { message: "Email is required." }),

  phone_number: z
    .string()
    .trim()
    .regex(/^\+?\d{1,3}?\d{10}$/, {
      message: "Phone number must be a 10-digit number starting with 0.",
    }),

  first_name: z.string().trim().min(1, { message: "First name is required." }),

  middle_name: z.string().trim().optional(), // Allows middle name to be optional

  last_name: z.string().trim().min(1, { message: "Last name is required." }),
});
