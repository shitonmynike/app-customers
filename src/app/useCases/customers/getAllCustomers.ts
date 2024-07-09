import { api } from '@/app/config/axios'
import { ICustomer } from '@/interfaces/customer'

export async function getAllCustomers(): Promise<ICustomer[]> {
  const response = await api.get('/customers')
  return response.data
}
