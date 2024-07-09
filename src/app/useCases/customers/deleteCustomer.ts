import { api } from '@/app/config/axios'

export async function deleteCustomer(id: React.Key) {
  await api.delete(`/customers/${id}`)
}
