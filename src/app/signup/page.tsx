'use client'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Input } from '@nextui-org/react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signup, signupWithPostgres } from '@/app/actions/actions'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(5, { message: 'Usuário inválido' }),
  password: z.string().min(5, { message: 'Senha inválida' }),
  name: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
})

export type InputsSignup = z.infer<typeof schema>

export default function SignupPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  /* This code snippet is using the `useForm` hook from the `react-hook-form` library to handle form
  validation and submission in a React component. Let's break down what each part of this code is
  doing: */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSignup>({
    resolver: zodResolver(schema),
  })

  /**
   * The function onSubmit handles form submission for signing up a user, displaying an error message if
   * the signup fails.
   * @param data - The `data` parameter in the `onSubmit` function likely contains the form inputs
   * submitted by the user for signing up. These inputs could include information such as the user's
   * name, email, password, and any other required details for creating a new account. The `signup`
   * function is then called
   */
  const onSubmit: SubmitHandler<InputsSignup> = async (data) => {
    try {
      setIsLoading(true)
      // await signup(data)
      await signupWithPostgres(data)
      toast.success('Cadastro  efetuado. Faça login!', {
        theme: 'colored',
        onClose: () => {
          router.push('/')
        },
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Não foi possivel cadastrar')
    }
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-[500px] rounded-lg bg-gray-300 p-10">
        <section className="mb-4 text-2xl font-bold">
          {' '}
          Página de Cadastro
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            type="text"
            label="Usuário"
            placeholder="Digite seu usuário"
            {...register('username', { required: true })}
          />
          <Input
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            type="text"
            label="Nome"
            placeholder="Digite seu nome"
            {...register('name', { required: true })}
          />
          <Input
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            type="text"
            label="E-mail"
            placeholder="Digite seu e-mail"
            {...register('email', { required: true })}
          />
          <Input
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password', { required: true })}
          />
          <Button
            size="lg"
            isLoading={isLoading}
            type="submit"
            color="primary"
            fullWidth
          >
            {!isLoading ? 'Cadastrar' : ''}
          </Button>
        </form>
        <Button
          type="button"
          color="primary"
          variant="light"
          fullWidth
          className="mt-4"
          onClick={() => router.push('/')}
        >
          Voltar para login
        </Button>
      </section>
      <ToastContainer />
    </main>
  )
}
