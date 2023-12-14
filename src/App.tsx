import { BrowserRouter } from 'react-router-dom'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { NavBar } from '@/components/nav-bar'
import { theme } from './theme'
import { routes } from './routes'
import './App.scss'
import 'normalize.css'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box>
          <NavBar />
          <Box>{routes}</Box>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  )
}
