import { z } from 'zod'

export const createCustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.string(),
  status: z.boolean(),
  age: z.string().optional(),
  terms: z.string().optional(),
})

export type TCustomer = z.infer<typeof createCustomerSchema>
