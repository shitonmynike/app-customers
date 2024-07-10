import { api } from '@/app/config/axios'
import { ICustomer } from '@/interfaces/customer'

export async function updateCustomerByID(
  id: string,
  status: boolean,
): Promise<ICustomer> {
  // await new Promise<void>((resolve) => {
  //   setTimeout(() => {
  //     resolve()
  //   }, 4000)
  // })
  const response = await api.patch(`/customers/${id}`, {
    status,
  })
  return response.data
}
