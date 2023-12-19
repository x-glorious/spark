import { FC, useMemo } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

export const useIntlFc = <T extends FC>(descriptor: MessageDescriptor) => {
  const intl = useIntl()

  intl.formatMessage
  return useMemo(() => {
    return intl.messages[descriptor.id!] as unknown as T
  }, [intl, descriptor])
}
