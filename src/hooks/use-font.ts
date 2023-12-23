import { useEffect, useState } from 'react'
import WebFont from 'webfontloader'

export const useFont = () => {
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito', 'Ma+Shan+Zheng'],
      },
      active: () => {
        setFinished(true)
        document.body.setAttribute('font-valid', 'true')
      },
      inactive: () => setFinished(true),
    })
  }, [])

  return finished
}
