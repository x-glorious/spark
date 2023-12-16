import { useEffect, useState } from 'react'
import WebFont from 'webfontloader'

export const useFont = () => {
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito'],
      },
      active: () => {
        setFinished(true)
        document.body.setAttribute('font-en-valid', 'true')
      },
      inactive: () => setFinished(true),
    })
  }, [])

  return finished
}
