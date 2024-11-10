import { useRoutes, BrowserRouter } from 'react-router-dom'
import { Home } from '../Home'
import { NotFound } from '../NotFound'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/wwe-2k-draft-verse', element: <Home /> },
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
