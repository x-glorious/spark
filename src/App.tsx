import { Box, ChakraProvider } from '@chakra-ui/react'
import { NavBar } from '@/components/nav-bar'
import { GlobalMask } from '@/components/global-mask'
import { useInit } from '@/hooks/use-init'
import { theme } from './theme'
import { routes } from './routes'
import './App.scss'
import 'normalize.css'

export const App = () => {
  const initialized = useInit()

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <NavBar />
        <Box>{routes}</Box>
      </Box>
      <GlobalMask visible={!initialized} />
    </ChakraProvider>
  )
}
