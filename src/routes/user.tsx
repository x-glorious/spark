import { Route } from 'react-router-dom'
import { UserLogin } from '@/pages/user/login'

export const user = (
  <>
    <Route path="user/login" element={<UserLogin />} />
  </>
)
