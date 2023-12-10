import { getEnv } from '@/utils/env'
import { host } from '@/utils/server'

export enum OauthPlatform {
  github = 'github'
}


export const oauth = (platform: OauthPlatform) => {
  const getRedirectUrl = (platform: OauthPlatform) => host + '/api/oauth/redirect' + `?platform=${platform}&back_to=${
    encodeURIComponent(location.href.replace(location.origin, ''))
  }`

  const urlMap = {
    [OauthPlatform.github]: `https://github.com/login/oauth/authorize?prompt=consent&client_id=${getEnv().VITE_OAUTH_GITHUB_CLIENT_ID}&redirect_uri=${
      encodeURIComponent(getRedirectUrl(OauthPlatform.github))}`
  }

  window.location.href = urlMap[platform]
}
