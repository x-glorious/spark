import { Box, Divider, Flex } from '@chakra-ui/react'
import { AppIcon } from '@/components/app-icon'
import { useLocation } from 'react-router-dom'
import { SloganEn } from '@/assets/texts/slogan-en'
// import { SloganCn } from '@/assets/texts/slogan-cn'

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
          <Box h={7} color="purple.800">
            <SloganEn />
          </Box>
        </Flex>
        <Flex flex={1} justifyContent="flex-end"></Flex>
      </Flex>
      <Divider />
    </>
  )
}
