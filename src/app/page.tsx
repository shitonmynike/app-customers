'use client'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Input } from '@nextui-org/react'
// import { useActionState } from 'react'
import { login } from '@/app/actions/actions'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(5, { message: 'Usuário inválido' }),
  password: z.string().min(5, { message: 'Senha inválida' }),
})

export type Inputs = z.infer<typeof schema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)
      const response = await login(data)
      console.log(response)
      setIsLoading(false)
      router.push('/admin/')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setError('username', { type: 'manual', message: 'Credenciais inválidas' })
      setError('password', { type: 'manual', message: 'Credenciais inválidas' })
      toast.error('Credenciais inválidas')
    }
  }

  // React.useEffect(() => {
  //   if (errors.password) {
  //     toast.error('Senha inválida')
  //   }
  //   if (errors.username) {
  //     toast.error('Usuário inválido')
  //   }
  // }, [errors])

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-[500px] rounded-lg bg-gray-300 p-10">
        <section className="mb-4 text-2xl font-bold"> Página do Login</section>
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
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password', { required: true })}
          />
          {/* <section className="font-semibold text-red-500">
            {state?.message}
          </section> */}
          <Button
            size="lg"
            isLoading={isLoading}
            type="submit"
            color="primary"
            fullWidth
          >
            {!isLoading ? 'Login' : ''}
          </Button>
        </form>
        <Button
          type="button"
          color="primary"
          variant="light"
          fullWidth
          className="mt-4"
          onClick={() => router.push('/signup')}
        >
          Não tem cadastro ainda, clique aqui
        </Button>
      </section>
      <ToastContainer />
    </main>
  )
}
