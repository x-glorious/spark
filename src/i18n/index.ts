import { createIntl, createIntlCache } from 'react-intl'
import { enMessages } from './en'
import { StorageKey } from '@/utils/storage'
import { cnMessages } from './cn'

export enum Locale {
  en = 'en-Us',
  cn = 'zh-Cn',
}

export const changeLocale = (locale: Locale) => {
  localStorage.setItem(StorageKey.locale, locale)
  location.reload()
}

export const getLocale = (): Locale =>
  (localStorage.getItem(StorageKey.locale) as Locale) || Locale.en

const getMessages = (locale: Locale) =>
  ({
    [Locale.en]: enMessages,
    [Locale.cn]: cnMessages,
  })[locale]

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

export const intl = createIntl(
  {
    locale: getLocale(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: getMessages(getLocale()) as any,
  },
  // {
  //   locale: 'zh-Cn',
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   messages: cnMessages as any,
  // },
  cache,
)
