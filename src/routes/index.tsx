import { Routes } from 'react-router-dom'
import { home } from './home'
import { oauth } from './oauth'

export const routes = (
  <Routes>
    {home}
    {oauth}
  </Routes>
)
