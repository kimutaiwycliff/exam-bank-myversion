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
    .email({ message: 'Invalid email address.' })
    .trim()
    .min(1, { message: 'Email is required.' }),

  phone_number: z
    .string()
    .trim()
    .regex(/^\+?\d{1,3}?\d{10}$/, {
      message: 'Phone number must be a 10-digit number starting with 0.',
    }),

  first_name: z.string().trim().min(1, { message: 'First name is required.' }),

  middle_name: z.string().trim().optional(), // Allows middle name to be optional

  last_name: z.string().trim().min(1, { message: 'Last name is required.' }),
});

export const gradeSchema = z.object({
  name: z.string().min(5, {
    message: 'Username must be at least 5 characters.',
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters.',
  }),
});

export const topicSchema = z.object({
  name: z.string().min(5, {
    message: 'Username must be at least 5 characters.',
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters.',
  }),
  grade: z.string().min(1, {
    message: 'Grade is required.',
  }),
  subject: z.string().min(1, {
    message: 'Subject is required.',
  }),
});

export const objectiveSchema = z.object({
  topic: z.string().nullable(),
  subtopic: z.string().nullable(),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters.',
  }),
});

export const subtopicSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  topic: z.string().min(1, {
    message: "Topic is required.",
  }),
});

export const questionSchema = z.object({
  subject: z.string(),
  topic: z.string(),
  subtopic: z.string(),
  difficulty_level: z.string(),
  objective: z.string(),
  marks: z.union([z.string(), z.number()]),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  marking_scheme: z.string().min(5, {
    message: "Marking scheme must be at least 5 characters.",
  }),
});

export const sectionSchema = z.object({
  exam_id: z.string(),
  name: z.string(),
  number_of_questions: z.string(),
  total_marks: z.string(),
  instructions: z.string(),
})
