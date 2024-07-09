import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4500',
  timeout: 10000,
  headers: { 'api-key': 'thundercatz' },
})
