import { oauth, OauthPlatform } from '@/services/oauth'
import { server } from '@/utils/server'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      server.get('user/detail').then((e) => {
        console.error(e)
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
