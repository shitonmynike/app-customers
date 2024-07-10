'use client'
import 'react-toastify/dist/ReactToastify.css'
import { ICustomer } from '@/interfaces/customer'
import { Button, Card, CardBody, Switch } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { getCustomerByID } from '@/app/useCases/customers/getCustomerByID'
import { updateCustomerByID } from '@/app/useCases/customers/updateCustomerByID'

type TCustomersDetailsPageProps = {
  id: string
}

export default function CustomersDetailsPage({
  params,
}: {
  params: TCustomersDetailsPageProps
}) {
  const [customer, setCustomer] = React.useState<ICustomer | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const router = useRouter()

  const handleGetCustomerByID = React.useCallback(async () => {
    try {
      const response = await getCustomerByID(params.id)
      setCustomer(response)
      setIsLoading(false)
    } catch (error) {
      toast.error('Problemas com API!', {
        theme: 'colored',
      })
    }
  }, [params.id])

  async function handleUpdateStatus(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      await updateCustomerByID(params.id, e.target.checked)
      toast.success('Status atualizado', {
        theme: 'colored',
      })
    } catch (error) {
      toast.error('Problemas com API!', {
        theme: 'colored',
      })
    }
  }

  React.useEffect(() => {
    handleGetCustomerByID()
  }, [handleGetCustomerByID])

  return (
    <main className="flex h-screen flex-col">
      <section id="HEADER" className="flex justify-between p-6">
        <section className="text-2xl font-semibold">
          #{params.id} - Cliente
        </section>
        <section>
          <Button
            color="primary"
            onClick={() => router.push('/admin/customers/')}
          >
            Lista de Clientes
          </Button>
        </section>
      </section>
      <section className="flex flex-1 px-6">
        <Card className="flex-1">
          {!isLoading ? (
            <CardBody className="flex gap-3 p-6">
              <section className="text-xl">
                <strong>Nome: </strong>
                {customer?.name}
              </section>
              <section className="text-xl">
                <strong>Função: </strong>
                {customer?.role}
              </section>
              <section className="text-xl">
                <strong>Status: </strong>
                <Switch
                  defaultSelected={customer?.status}
                  aria-label="Status do cliente"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateStatus(e)
                  }
                />
              </section>
            </CardBody>
          ) : (
            <CardBody className="flex gap-3 p-6">
              <section>Carregando dados do cliente...</section>
            </CardBody>
          )}
        </Card>
      </section>
      <ToastContainer />
    </main>
  )
}
