import Axios from 'axios'
import { RuntimeEnv, getEnv } from './env'
import { StorageKey } from './storage'

export const host =
  getEnv().MODE === RuntimeEnv.dev
    ? 'http://localhost:3000'
    : 'https://spark-serverless.vercel.app'

export const server = Axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
  baseURL: `${
    // for dev proxy
    getEnv().MODE === RuntimeEnv.dev ? location.origin : host
  }/api/`,
  timeout: 8000,
  transformRequest: [
    (_data, headers) => {
      headers.set(
        'X-Authorization',
        localStorage.getItem(StorageKey.authToken) || '',
      )
    },
  ],
  withCredentials: true,
})
