import { RuntimeEnv, getEnv } from './env'

export const host = getEnv().MODE === RuntimeEnv.dev ? 'https://spark-serverless.vercel.app' : 'https://spark-serverless.vercel.app'

export const api = (path: string) => `${host}/api/${path}`
