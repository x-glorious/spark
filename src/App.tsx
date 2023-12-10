import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { routes } from './routes'
import './App.scss'
import 'normalize.css'

export const App = () => {
  return (
    <ChakraProvider>
      <div>
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    </ChakraProvider>
  )
}
