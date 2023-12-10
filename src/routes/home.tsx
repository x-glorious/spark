import { Route } from 'react-router-dom'
import { Home } from '@/pages/home'

export const home = (
  <>
    <Route path="/" element={<Home />} />
  </>
)
