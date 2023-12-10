
import { StorageKey } from '@/utils/storage'
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export const UserLogin = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    const backTo = searchParams.get('back')

    if(token && backTo) {
      localStorage.setItem(StorageKey.authToken, token as string)
      navigate(backTo)
    }
  }, [searchParams, navigate])

  return <div>login</div>
}
