import { createIntl, createIntlCache } from 'react-intl'
import { enMessages } from './en'
import { cnMessages } from './cn'

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

export const intl = createIntl(
  // {
  //   locale: 'en-Us',
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   messages: enMessages as any,
  // },
  {
    locale: 'zh-Cn',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: cnMessages as any,
  },
  cache,
)
