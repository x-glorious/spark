import { Routes } from 'react-router-dom'
import { user } from './user'
import { home } from './home'

export const routes = (
  <Routes>
    {home}
    {user}
  </Routes>
)
