// No arquivo actions.ts

'use server'

import postgres from 'postgres'
import { Inputs } from '../page'
import { InputsSignup } from '../signup/page'

export async function login(data: Inputs) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  })
  const res = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (json.token) {
    return json.token
  }
}

export async function signup(data: InputsSignup) {
  const res = await fetch('http://localhost:4500/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return json
}

export async function signupWithPostgres(data: InputsSignup) {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'allow',
  })

  try {
    await sql`
  INSERT INTO users (username, email, name, password)
  VALUES (${data.username}, ${data.email}, ${data.name}, ${data.password})
`

    return 'Usuário inserido com sucesso'
  } catch (e) {
    console.log(e)
    return 'Problemas ao inserir usuário'
  }
}
