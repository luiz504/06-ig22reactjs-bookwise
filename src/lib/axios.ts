import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

export const serverApi = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
})

export { AxiosError }
