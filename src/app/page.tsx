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
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data)
      console.log(response)
      router.push('/admin/customers')
    } catch (error) {
      console.log(error)
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
        Página do Login
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
          <Button type="submit" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </section>
      <ToastContainer />
    </main>
  )
}
