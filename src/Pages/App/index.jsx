import { Home } from '../Home/inde'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { NotFound } from '../NotFound'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/*', element: <NotFound /> }
  ])

  return (
    routes
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
