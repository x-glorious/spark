import { Button, Divider, Flex, Icon, IconButton } from '@chakra-ui/react'
import { AppIcon } from '@/components/app-icon'
import { BsBookHalf } from 'react-icons/bs'
import { PiCampfireFill } from 'react-icons/pi'
import { Slogan } from '@/components/slogan'
import { useDetailStore } from '@/stores/user'
import { Avatar } from './avatar'
import { useLocation, useNavigate } from 'react-router-dom'
import { Language } from './language'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { i18nDefine } from '@/i18n/define'

export const NavBar = () => {
  const user = useDetailStore((state) => state.value)
  const location = useLocation()
  const navigate = useNavigate()
  const intl = useIntl()

  const toHome = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/')
    }
  }, [location, navigate])

  if (['/oauth/login'].includes(location.pathname)) {
    return null
  }

  return (
    <>
      <Flex height="100%" alignItems="center" h={14} px={4} py={4}>
        <Flex alignItems="center" gap={1}>
          <AppIcon size={10} />
          <Slogan size={6} onClick={toHome} cursor="pointer" />
        </Flex>
        <Flex flex={1} gap={2} justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            aria-label="inspiration"
            fontSize="lg"
            icon={<Icon as={PiCampfireFill} />}
          />
          <IconButton
            size="sm"
            colorScheme="orange"
            aria-label="novel"
            icon={<Icon as={BsBookHalf} />}
          />
        </Flex>
        <Flex alignItems="center" gap={4}>
          <Language />
          {user ? (
            <Avatar />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/oauth/login')}
            >
              {intl.formatMessage(i18nDefine.basic.login)}
            </Button>
          )}
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}
