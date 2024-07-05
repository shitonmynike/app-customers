type TCustomersDetailsPageProps = {
  id: string
}

export default function CustomersDetailsPage({
  params,
}: {
  params: TCustomersDetailsPageProps
}) {
  return <main>Página do Cliente com ID:{params.id}</main>
}
