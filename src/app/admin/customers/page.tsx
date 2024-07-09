'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
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
} from '@nextui-org/react'
import { Eye, Trash2 } from 'lucide-react'
import { getAllCustomers } from '@/app/useCases/customers/getAllCustomers'
import { ICustomer } from '@/interfaces/customer'

export default function CustomersPage() {
  const [listCustomers, setListCustomers] = React.useState<ICustomer[]>([])
  const router = useRouter()

  /* The `React.useEffect` hook in the provided code snippet is used to perform side effects in function
components. In this case, it is making an asynchronous call to the `getAllCustomers` function when
the component mounts (since the dependency array `[]` is empty, indicating that the effect should
only run once after the initial render). */
  React.useEffect(() => {
    async function handleGetAllCustomers() {
      const response = await getAllCustomers()
      setListCustomers(response)
    }
    handleGetAllCustomers()
  }, [])

  return (
    <main>
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
                <Image width={200} alt="NextUI hero Image" src="/no-data.jpg" />
                <section className="text-sm font-bold">
                  Nenhum cliente encontrado
                </section>
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
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new">
                        <section className="flex w-full justify-center">
                          Deseja excluir?
                        </section>
                        <section className="mt-4 flex gap-2">
                          <Button
                            color="danger"
                            variant="faded"
                            aria-label="Visualizar Cliente"
                          >
                            Não
                          </Button>
                          <Button
                            color="success"
                            variant="faded"
                            aria-label="Visualizar Cliente"
                          >
                            Sim
                          </Button>
                        </section>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    isIconOnly
                    color="warning"
                    variant="faded"
                    aria-label="Visualizar Cliente"
                  >
                    <Eye />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  )
}
