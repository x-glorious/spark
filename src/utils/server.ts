import Axios, { AxiosError } from 'axios'
import { RuntimeEnv, getEnv } from './env'
import { StorageKey } from './storage'

export const host =
  getEnv().MODE === RuntimeEnv.dev
    ? 'http://localhost:3000'
    : 'https://spark-serverless.vercel.app'

const server = Axios.create({
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
      headers.set(
        'X-Authorization-Refresh',
        localStorage.getItem(StorageKey.authRefreshToken) || '',
      )
    },
  ],
  withCredentials: true,
})

let refreshPromise: Promise<boolean> | undefined = undefined

export const enableRefresh = () => (refreshPromise = undefined)

server.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error as AxiosError

    // refresh token
    if (response?.status === 401 && config?.url !== 'oauth/refresh') {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { data, status } = await server.post('oauth/refresh')
          if (status === 200) {
            const { authToken, refreshToken } = data
            localStorage.setItem(StorageKey.authToken, authToken as string)
            localStorage.setItem(
              StorageKey.authRefreshToken,
              refreshToken as string,
            )
            return true
          }

          return false
        })()
      }
      const refreshSucceed = await refreshPromise

      if (refreshSucceed) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return server(config as unknown as any)
      }
    }

    // cannot refresh, have to login
    if (response?.status === 401) {
      // todo: 白名单校验，如果不通过，则，直接跳转到登录页面
    }

    return response
  },
)

export { server }
