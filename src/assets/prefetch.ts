import { nanoid } from 'nanoid'
import LoginIllustration from '@/assets/backgrounds/oauth/login/illustration.png'

interface PrefetchDetail {
  url: string
  id: string
  loaded: boolean
}

const addPrefetchLink = (detail: PrefetchDetail) => {
  if (!document.getElementById(detail.id) && !detail.loaded) {
    const image = new Image()
    image.src = detail.url
    image.id = detail.id
    image.style.display = 'none'

    const onFinal = () => {
      detail.loaded = true
      document.body.removeChild(image)
    }

    image.onload = onFinal
    image.onerror = onFinal
    document.body.appendChild(image)
  }
}

const globalConfigList: PrefetchDetail[] = [
  {
    id: nanoid(),
    url: LoginIllustration,
    loaded: false,
  },
]

const global = () => globalConfigList.forEach(addPrefetchLink)

export const prefetch = {
  global,
}
