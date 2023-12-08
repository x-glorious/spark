export interface Env {
    VITE_OAUTH_GITHUB_CLIENT_ID: string
}

export const getEnv = () => import.meta.env as unknown as Env