// No arquivo actions.ts

'use server'

import { Inputs } from '../page'

export async function login(data: Inputs) {
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
