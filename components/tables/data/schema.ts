import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export const gradesSchema = z.object({
  id: z.string(),
  name: z.string().min(5, {
    message: 'Username must be at least 5 characters.',
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters.',
  }),
})

export type Grade = z.infer<typeof gradesSchema>

export type Task = z.infer<typeof taskSchema>
