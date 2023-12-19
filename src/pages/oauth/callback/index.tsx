import { useEffect } from 'react'
import { StorageKey } from '@/utils/storage'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { enableRefresh } from '@/utils/server'

export const OauthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('auth-token')
    const refreshToken = searchParams.get('refresh-token')

    if (token && refreshToken) {
      localStorage.setItem(StorageKey.authToken, token as string)
      localStorage.setItem(StorageKey.authRefreshToken, refreshToken as string)
      enableRefresh()
      navigate('/', {
        replace: true,
      })
    }
  }, [searchParams, navigate])

  return <></>
}
