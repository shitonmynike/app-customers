'use client'

import { createUserSchema, TUser } from '@/app/schemas/schemasZod'
import {
  Button,
  cn,
  Input,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
// import { DevTool } from '@hookform/devtools'
import {
  getAddressByCEP,
  maskCEP,
  maskDocument,
  maskPhone,
} from '@/app/utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import { IViaCEP } from '@/interfaces/cep'
import { zodResolver } from '@hookform/resolvers/zod'

export default function AddFormCustomers() {
  const [isFetching] = React.useState<boolean>(false)
  const router = useRouter()
  const howMeet = [
    { key: 'Google', label: 'Google' },
    { key: 'Facebook', label: 'Facebook' },
    { key: 'Instagram', label: 'Instagram' },
  ]

  const {
    register,
    handleSubmit,
    setValue,
    //   control,
    watch,
    formState: { errors },
  } = useForm<TUser>({
    resolver: zodResolver(createUserSchema),
  })

  async function handleGetAddress(cep: string) {
    try {
      const response = await getAddressByCEP(cep)
      if ('error' in response) {
        throw Error('CEP invalído')
      }
      const address = response as IViaCEP
      setValue('street', address?.logradouro)
      setValue('district', address?.bairro)
      setValue('state', address?.uf)
      setValue('city', address?.localidade)
    } catch (error) {
      toast.error('CEP inválido', {
        theme: 'colored',
      })
    }
  }

  async function handleCreateUser(data: TUser) {
    console.log(data)
  }

  return (
    <main className="flex h-screen flex-col">
      <section id="HEADER" className="flex justify-between p-6">
        <section className="text-2xl font-semibold">Adicionar Cliente</section>
        <section>
          <Button
            color="primary"
            onClick={() => router.push('/admin/customers/')}
          >
            Lista de Clientes
          </Button>
        </section>
      </section>

      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="grid grid-cols-3 gap-2 p-6"
      >
        <section className="grid grid-cols-3 gap-2 p-6">
          <Input
            type="text"
            label="Nome"
            isInvalid={!!errors.name?.message}
            errorMessage={errors.name?.message}
            placeholder=""
            description="Nome com mínimo 10 caracteres"
            {...register('name')}
          />
          <Input
            type="text"
            label="CEP"
            placeholder=""
            onInput={(event) => {
              const input = (event?.target as HTMLInputElement)?.value
              const maskedInput = maskCEP(input)
              console.log(maskedInput)
              setValue('cep', maskedInput)
              if (maskedInput.length === 9) {
                handleGetAddress(maskedInput)
              }
            }}
            {...register('cep')}
            maxLength={10}
          />
          <Input
            type="text"
            label="Número"
            placeholder=""
            {...register('number')}
          />
          <Input
            type="text"
            label="Rua"
            placeholder=""
            isReadOnly
            value={watch('street')}
            {...register('street')}
          />
          <Input
            type="text"
            label="Bairro"
            placeholder=""
            isReadOnly
            value={watch('district')}
            {...register('district')}
          />
          <Input
            type="text"
            label="Cidade"
            placeholder=""
            isReadOnly
            value={watch('city')}
            {...register('city')}
          />
          <Input
            type="text"
            label="Estado"
            placeholder=""
            isReadOnly
            value={watch('state')}
            {...register('state')}
          />
          <Input
            type="text"
            label="CPF"
            placeholder=""
            {...register('cpf')}
            maxLength={14}
            onInput={(event) => {
              const input = (event?.target as HTMLInputElement)?.value
              const maskedInput = maskDocument('CPF', input)
              console.log(maskedInput)
              setValue('cpf', maskedInput)
            }}
            {...register('cpf')}
          />
          <Input
            type="text"
            label="Telefone"
            placeholder=""
            maxLength={15}
            {...register('phone')}
            onInput={(event) => {
              const input = (event?.target as HTMLInputElement)?.value
              const maskedInput = maskPhone(input)
              setValue('phone', maskedInput)
            }}
            {...register('phone')}
          />
          <Switch
            classNames={{
              base: cn(
                'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                'data-[selected=true]:border-primary',
              ),
              wrapper: 'p-0 h-4 overflow-visible',
              thumb: cn(
                'w-6 h-6 border-2 shadow-lg',
                'group-data-[hover=true]:border-primary',
                // selected
                'group-data-[selected=true]:ml-6',
                // pressed
                'group-data-[pressed=true]:w-7',
                'group-data-[selected]:group-data-[pressed]:ml-4',
              ),
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium">Status</p>
              <p className="text-tiny text-default-400">
                Ative ou desative o status para cadastrar-se no aplicativo
              </p>
            </div>
          </Switch>
          <Select
            label="Como você nos conheceu?"
            className="max-w-xs"
            {...register('howMeet')}
          >
            {howMeet.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </section>
        <section>
          <Button
            size="lg"
            isLoading={isFetching}
            type="submit"
            color="primary"
            fullWidth
          >
            {!isFetching ? 'Atualizar' : ''}
          </Button>
        </section>
      </form>
      <ToastContainer />
      {/* <DevTool control={control}></DevTool> */}
    </main>
  )
}
