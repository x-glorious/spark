export enum RuntimeEnv {
  dev = 'development',
  pro = 'production',
}

export interface Env {
  VITE_OAUTH_GITHUB_CLIENT_ID: string
  MODE: RuntimeEnv
}

export const getEnv = () => import.meta.env as unknown as Env
