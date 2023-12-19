import { FC } from 'react'
import { MessageDescriptor, defineMessage } from 'react-intl'

export type Lang = {
  [key: string]: string | FC
}

export type Descriptor = Required<Pick<MessageDescriptor, 'id'>> &
  Omit<MessageDescriptor, 'id'>

export const autoSetIds = <T extends object>(obj: T, path: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache = obj as any
  for (const key of Object.keys(cache)) {
    const newPath = path + ':' + key
    if (typeof cache[key] === 'object') {
      autoSetIds(cache[key], newPath)
    } else {
      cache[key] = defineMessage({
        id: newPath,
      })
    }
  }

  return obj
}
