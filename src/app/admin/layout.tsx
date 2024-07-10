import NavBar from '../components/ui/NavBar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="relative h-screen overflow-y-auto bg-zinc-200">
      <NavBar />
      {children}
    </section>
  )
}
