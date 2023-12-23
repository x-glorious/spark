import { Button, Divider, Flex } from '@chakra-ui/react'
import { AppIcon } from '@/components/app-icon'
import { Slogan } from '@/components/slogan'
import { useDetailStore } from '@/stores/user'
import { LuLogIn } from 'react-icons/lu'
import { Avatar } from './avatar'
import { useLocation, useNavigate } from 'react-router-dom'
import { Language } from './language'
import { useCallback } from 'react'

export const NavBar = () => {
  const user = useDetailStore((state) => state.value)
  const location = useLocation()
  const navigate = useNavigate()

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
        <Flex flex={1} justifyContent="flex-end" alignItems="center" gap={4}>
          <Language />
          {user ? (
            <Avatar />
          ) : (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LuLogIn />}
              onClick={() => navigate('/oauth/login')}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}
