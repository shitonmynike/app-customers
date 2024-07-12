import { z } from 'zod'

export const createCustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(10, { message: 'Mínimo 10 caracteres' }),
  role: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
  status: z.boolean().optional(),
  //  age: z.string().optional(),
  terms: z.boolean(),
})

export type TCustomer = z.infer<typeof createCustomerSchema>
export const createUserSchema = z.object({
  name: z.string().min(10, { message: 'Mínimo 10 caracteres' }),
  cep: z.string(),
  number: z.string(),
  cpf: z.string(),
  phone: z.string().min(11, { message: 'Mínimo 10 caracteres numéricos' }),
  status: z.boolean(),
  howMeet: z.string(),
})

export type TUser = z.infer<typeof createUserSchema>
