'use client'
import 'react-toastify/dist/ReactToastify.css'
import { ICustomer } from '@/interfaces/customer'
import { Button, Card, CardBody, Switch, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { getCustomerByID } from '@/app/useCases/customers/getCustomerByID'
import { updateCustomerByID } from '@/app/useCases/customers/updateCustomerByID'
import { useForm } from 'react-hook-form'
import { TCustomer } from '@/app/schemas/schemasZod'

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
  const [isFetching, setIsFetching] = React.useState<boolean>(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCustomer>()

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

  async function handleUpdateCustomer(data: TCustomer) {
    console.log(data)
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
              <form onSubmit={handleSubmit(handleUpdateCustomer)}>
                <section className="text-xl">
                  <Input
                    type="text"
                    label="Nome"
                    variant="bordered"
                    defaultValue={customer?.name}
                    placeholder="Digite seu nome do cliente"
                    {...register('name')}
                  />
                </section>
                <section className="text-xl">
                  <Input
                    type="text"
                    label="Função"
                    variant="bordered"
                    defaultValue={customer?.role}
                    placeholder="Digite a função do cliente"
                    {...register('role')}
                  />
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
                <section className="text-xl">
                  <strong>Aceito termo: </strong>
                  <Switch aria-label="Aceitou o termo" {...register('terms')} />
                </section>
                <Button
                  size="lg"
                  isLoading={isFetching}
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  {!isFetching ? 'Atualizar' : ''}
                </Button>
              </form>
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
