import { api } from '@/app/config/axios'
import { ICustomer } from '@/interfaces/customer'

export async function getCustomerByID(id: string): Promise<ICustomer> {
  // await new Promise<void>((resolve) => {
  //   setTimeout(() => {
  //     resolve()
  //   }, 4000)
  // })
  const response = await api.get(`/customers/${id}`)
  return response.data
}
