import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes'

export const App = () => {

  return (
    <div>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </div>
  )
}
