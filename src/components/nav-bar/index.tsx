import { useRef } from 'react'
import { Button, Divider, Flex } from '@chakra-ui/react'
import { AppIcon } from '@/components/app-icon'
import { LoginModal, LoginModalRef } from '@/components/login-modal'
import { Slogan } from '@/components/slogan'
import { useDetailStore } from '@/stores/user'
import { LuLogIn } from 'react-icons/lu'
import { Avatar } from './avatar'

export const NavBar = () => {
  const user = useDetailStore((state) => state.value)
  const loginModalRef = useRef<LoginModalRef | null>(null)

  return (
    <>
      <Flex height="100%" alignItems="center" h={14} px={4} py={4}>
        <Flex alignItems="center" gap={1}>
          <AppIcon size={10} />
          <Slogan size={6} />
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          {user ? (
            <Avatar />
          ) : (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LuLogIn />}
              onClick={() => loginModalRef.current?.open()}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
      <Divider />
      <LoginModal ref={loginModalRef} />
    </>
  )
}
