'use client'

import { LogOut, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const router = useRouter()
  return (
    <section className="fixed bottom-10 left-0 right-0 z-[9999] mx-auto flex h-20 w-72 items-center justify-center gap-4 rounded-xl border border-zinc-500 bg-zinc-300 text-sm drop-shadow-2xl">
      <button
        className="flex flex-col items-center gap-1"
        onClick={() => router.push('/admin/customers')}
      >
        <Users />
        <section>Clientes</section>
      </button>
      <button
        className="flex flex-col items-center gap-1"
        onClick={() => router.push('/admin/my-profile')}
      >
        <User />
        <section>Meu Perfil</section>
      </button>
      <button className="flex flex-col items-center gap-1">
        <LogOut />
        <section>Logout</section>
      </button>
    </section>
  )
}
