import { Slogan } from '@/components/slogan'
import { Flex } from '@chakra-ui/react'

export interface GlobalMaskProps {
  visible: boolean
}

export const GlobalMask = (props: GlobalMaskProps) => {
  const { visible } = props

  return visible ? (
    <Flex
      w="100vw"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      zIndex={900}
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      bg="white"
      transformOrigin="left top"
    >
      <Slogan size={24} />
    </Flex>
  ) : null
}
