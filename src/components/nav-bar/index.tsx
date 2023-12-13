import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { AppIcon } from '@/components/app-icon'
import { useLocation } from 'react-router-dom'

export const NavBar = () => {
  const location = useLocation()

  // login page do not need nav-bar, i should be empty
  if (location.pathname === '/user/login') {
    return <></>
  }

  return (
    <>
      <Flex height="100%" alignItems="center" h={16} px={4} py={4}>
        <Flex alignItems="center" gap={1}>
          <AppIcon />
          <Text fontSize="2xl" fontWeight="bold">
            Spark sea
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}
