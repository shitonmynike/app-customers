'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DropdownSection,
} from '@nextui-org/react'
import { Eye, Trash2 } from 'lucide-react'
import { getAllCustomers } from '@/app/useCases/customers/getAllCustomers'

import { deleteCustomer } from '@/app/useCases/customers/deleteCustomer'
import { TCustomer } from '@/app/schemas/schemasZod'

export default function CustomersPage() {
  const [listCustomers, setListCustomers] = React.useState<TCustomer[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const router = useRouter()

  async function handleGetAllCustomers() {
    try {
      const response = await getAllCustomers()
      setListCustomers(response)
      setIsLoading(false)
    } catch (error) {
      toast.error('Problemas com API!', {
        theme: 'colored',
      })
    }
  }

  async function handleDeleteCustomer(keys: React.Key) {
    try {
      await deleteCustomer(keys)
      toast.success('Registro excluído', {
        theme: 'colored',
      })
      handleGetAllCustomers()
    } catch (error) {
      toast.error('Problemas com API!', {
        theme: 'colored',
      })
    }
    console.log(keys)
  }

  /* The `React.useEffect` hook in the provided code snippet is used to perform side effects in function
components. In this case, it is making an asynchronous call to the `getAllCustomers` function when
the component mounts (since the dependency array `[]` is empty, indicating that the effect should
only run once after the initial render). */
  React.useEffect(() => {
    handleGetAllCustomers()
  }, [])

  return (
    <main className="mb-40">
      <section id="HEADER" className="flex justify-between p-6">
        <section className="text-2xl font-semibold">Lista de clientes</section>
        <section>
          <Button
            color="primary"
            onClick={() => router.push('/admin/customers/add')}
          >
            Cadastrar Cliente
          </Button>
        </section>
      </section>
      <section id="TABLE-CUSTOMERS" className="px-6">
        <Table aria-label="Tabela com dados de clientes">
          <TableHeader>
            <TableColumn>NOME</TableColumn>
            <TableColumn>FUNÇÃO</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn className="w-28">AÇÕES</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <section className="mb-6 flex w-full flex-col items-center">
                {!isLoading && (
                  <>
                    <Image
                      width={200}
                      alt="NextUI hero Image"
                      src="/no-data.jpg"
                    />
                    <section className="text-sm font-bold">
                      Nenhum cliente encontrado
                    </section>
                  </>
                )}
                {isLoading && (
                  <section className="text-sm font-bold">
                    Carregando clientes...
                  </section>
                )}
              </section>
            }
          >
            {listCustomers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="faded"
                        aria-label="Deletar Cliente"
                      >
                        <Trash2 />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Static Actions"
                      onAction={(key: React.Key) => handleDeleteCustomer(key)}
                    >
                      <DropdownSection title="Confirma ação?" showDivider>
                        <DropdownItem
                          textValue="Botão excluir item"
                          key={customer.id}
                          shortcut=""
                          description=""
                          classNames={{
                            base: 'bg-lime-500 text-white',
                          }}
                        >
                          <span className="flex justify-center text-sm">
                            Sim, excluir
                          </span>
                        </DropdownItem>
                        <DropdownItem
                          key="cancel"
                          shortcut=""
                          description=""
                          textValue="Botão cancelar ação"
                        >
                          <span className="flex justify-center text-xs">
                            Cancelar exclusão
                          </span>
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    isIconOnly
                    color="success"
                    variant="faded"
                    aria-label="Visualizar Cliente"
                    onClick={() =>
                      router.push(`/admin/customers/${customer.id}`)
                    }
                  >
                    <Eye />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <ToastContainer />
    </main>
  )
}
