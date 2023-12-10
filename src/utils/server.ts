import { RuntimeEnv, getEnv } from './env'

export const host =
  getEnv().MODE === RuntimeEnv.dev
    ? 'http://localhost:3000'
    : 'https://spark-serverless.vercel.app'

/**
 *
 * warning: in dev env, it will use proxy, so, if you want to get real server, please use host
 * @param path
 * @returns
 */
export const api = (path: string) =>
  `${
    // for dev proxy
    getEnv().MODE === RuntimeEnv.dev ? location.origin : host
  }/api/${path}`
