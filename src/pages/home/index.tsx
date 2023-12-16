import { oauth, OauthPlatform } from '@/services/oauth'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        <button onClick={() => navigate('user/login')}>to login page</button>
        <button onClick={() => oauth(OauthPlatform.github)}>test</button>
      </div>
    </>
  )
}
