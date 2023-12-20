import { Locale, changeLocale } from '@/i18n'
import { Box, Icon, IconButton, Tooltip } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { LuLanguages } from 'react-icons/lu'
import { useIntl } from 'react-intl'

export const Language = () => {
  const intl = useIntl()
  const [changing, setChanging] = useState(false)

  const icon = useMemo(() => {
    const fixDiff = 14

    return (
      <Box position="relative" width="20px" height="20px">
        <Box
          height="100%"
          position="absolute"
          left={0}
          top={0}
          clipPath={`polygon(${100 - fixDiff}% 0%, 100% 100%, 0% ${
            100 - fixDiff
          }%)`}
          color={intl.locale === Locale.en ? 'purple.500' : 'gray.500'}
        >
          <Icon as={LuLanguages} />
        </Box>
        <Box
          height="100%"
          position="absolute"
          left={0}
          top={0}
          color={intl.locale === Locale.cn ? 'purple.500' : 'gray.500'}
          clipPath={`polygon(0% 0%, 100% 0%, 100% ${fixDiff}%, ${fixDiff}% 100%, 0% 100%)`}
        >
          <Icon as={LuLanguages} />
        </Box>
      </Box>
    )
  }, [intl])

  return (
    <Tooltip hasArrow label="change language">
      {/* <Button size="sm" colorScheme="gray">
        中文
      </Button> */}
      <IconButton
        fontSize={changing ? undefined : 'xl'}
        aria-label="language"
        icon={icon}
        colorScheme="gray"
        size="sm"
        isLoading={changing}
        onClick={() => {
          setChanging(true)
          changeLocale(intl.locale === Locale.cn ? Locale.en : Locale.cn)
        }}
      />
    </Tooltip>
  )
}
