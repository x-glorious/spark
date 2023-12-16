import { server } from '@/utils/server'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useDetailStore } from './user'
import { OauthPlatform, oauth } from '@/services/oauth'

export interface OauthStore {
  exiting: boolean
  logout: () => Promise<void>
  login: (platform: OauthPlatform) => void
}

export const useOauthStore = create<OauthStore>()(
  devtools(
    (set) => ({
      exiting: false,
      login: (platform) => {
        oauth(platform)
      },
      logout: async () => {
        set(() => ({
          exiting: true,
        }))

        const result = await server.post('user/logout')

        if (result.status === 200) {
          // clear user state
          useDetailStore.setState({
            value: undefined,
          })
        }

        set(() => ({
          exiting: false,
        }))
      },
    }),
    {
      name: 'oauth',
    },
  ),
)
