import { oauth, OauthPlatform } from '@/services/oauth'
import { api } from '@/utils/server'
import { useNavigate } from 'react-router-dom'
import { StorageKey } from '@/utils/storage'
import { useEffect } from 'react'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      fetch(api('user/brief'), {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': localStorage.getItem(StorageKey.authToken) || '',
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <>
      <div>
        <button onClick={() => navigate('user/login')}>to login page</button>
        <button onClick={() => oauth(OauthPlatform.github)}>test</button>
      </div>
    </>
  )
}
