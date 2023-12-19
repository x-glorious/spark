import { Route } from 'react-router-dom'
import { OauthLogin } from '@/pages/oauth/login'
import { OauthCallback } from '@/pages/oauth/callback'

export const oauth = (
  <>
    <Route path="/oauth/login" element={<OauthLogin />} />
    <Route path="/oauth/callback" element={<OauthCallback />} />
  </>
)
