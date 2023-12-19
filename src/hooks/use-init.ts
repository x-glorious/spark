import { useDetailStore } from '@/stores/user'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { useFont } from './use-font'
import { prefetch } from '@/assets/prefetch'

export const useInit = () => {
  const location = useLocation()

  const [loaded, load, loading] = useDetailStore(
    useShallow((state) => [state.loaded, state.load, state.loading]),
  )
  const fontLoadFinished = useFont()

  useEffect(() => {
    prefetch.global()
  }, [])

  useEffect(() => {
    // oauth callback page do not execute user detail fetch
    if (location.pathname !== '/oauth/callback' && !loading && !loaded) {
      load()
    }
  }, [location, load, loading, loaded])

  return useMemo(() => {
    return loaded && fontLoadFinished
  }, [loaded, fontLoadFinished])
}
