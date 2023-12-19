import { Box, ChakraProvider } from '@chakra-ui/react'
import { RawIntlProvider } from 'react-intl'
import { NavBar } from '@/components/nav-bar'
import { GlobalMask } from '@/components/global-mask'
import { useInit } from '@/hooks/use-init'
import { intl } from '@/i18n'
import { theme } from './theme'
import { routes } from './routes'
import './App.scss'
import 'normalize.css'

export const App = () => {
  const initialized = useInit()

  return (
    <RawIntlProvider value={intl}>
      <ChakraProvider theme={theme}>
        <Box minW="1200px">
          <NavBar />
          <Box>{routes}</Box>
        </Box>
        <GlobalMask visible={!initialized} />
      </ChakraProvider>
    </RawIntlProvider>
  )
}
