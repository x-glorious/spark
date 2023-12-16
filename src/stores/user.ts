import { OauthPlatform } from '@/services/oauth'
import { server } from '@/utils/server'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Detail {
  id: string
  name: string
  avatar?: string
  email: string
  platform: OauthPlatform
}

export interface DetailStore {
  value?: Detail
  loaded: boolean
  load: () => Promise<void>
}

export const useDetailStore = create<DetailStore>()(
  devtools(
    (set) => ({
      loaded: false,
      load: async () => {
        try {
          const { status, data } = await server.get<Detail>('user/detail')
          if (status === 200) {
            set(() => ({ value: data }))
          }
        } catch (e) {
          // default
        }

        set(() => ({ loaded: true }))
      },
    }),
    {
      name: 'user:detail',
    },
  ),
)
