import { useDetailStore } from '@/stores/user'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { useFont } from './use-font'
import { prefetch } from '@/assets/prefetch'

export const useInit = () => {
  const location = useLocation()

  const [loaded, load] = useDetailStore(
    useShallow((state) => [state.loaded, state.load]),
  )
  const fontLoadFinished = useFont()

  useEffect(() => {
    prefetch.global()
  }, [])

  useEffect(() => {
    // login page do not execute user detail fetch
    if (location.pathname !== '/user/login') {
      load()
    }
  }, [location, load])

  return useMemo(() => {
    return loaded && fontLoadFinished
  }, [loaded, fontLoadFinished])
}
