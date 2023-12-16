import { getEnv } from '@/utils/env'
import { host } from '@/utils/server'
import Qs from 'qs'

export enum OauthPlatform {
  github = 'github',
}

export const oauth = (platform: OauthPlatform) => {
  const getRedirectUrl = (platform: OauthPlatform) => {
    return `${host}/api/oauth/redirect?${Qs.stringify({
      platform,
      back_to: location.href.replace(location.origin, ''),
    })}`
  }

  const urlMap = {
    [OauthPlatform.github]:
      'https://github.com/login/oauth/authorize?' +
      Qs.stringify({
        prompt: 'consent',
        client_id: getEnv().VITE_OAUTH_GITHUB_CLIENT_ID,
        redirect_uri: getRedirectUrl(OauthPlatform.github),
        scope: 'user:email',
      }),
  }

  window.location.href = urlMap[platform]
}
