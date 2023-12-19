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
  loading: boolean
  load: () => Promise<void>
}

export const useDetailStore = create<DetailStore>()(
  devtools(
    (set) => ({
      loaded: false,
      loading: false,
      load: async () => {
        set(() => ({ loading: true }))

        try {
          const { status, data } = await server.get<Detail>('user/detail')
          if (status === 200) {
            set(() => ({ value: data }))
          }
        } catch (e) {
          // default
        }

        set(() => ({ loading: false }))
        set(() => ({ loaded: true }))
      },
    }),
    {
      name: 'user:detail',
    },
  ),
)
