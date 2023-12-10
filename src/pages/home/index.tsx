import { oauth, OauthPlatform } from '@/services/oauth'
import { api } from '@/utils/server'
import { useNavigate } from 'react-router-dom'
import { StorageKey } from '@/utils/storage'
fetch(api('hello'), {
  credentials: 'include',
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
})

fetch(api('user/brief'), {
  credentials: 'include',
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "X-Authorization": localStorage.getItem(StorageKey.authToken) || ''
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
}).then(blob => blob.json()).then(e => console.error(e))

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
