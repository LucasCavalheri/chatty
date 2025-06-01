import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3333/api' : '/api',
  withCredentials: true
})
