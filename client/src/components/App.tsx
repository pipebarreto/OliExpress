import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/home/Home'
import { NavBar } from './NavBar/NavBar'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { Dashboard2 } from '../pages/dashboard/Dashboard2'
import { Dashboard3 } from '../pages/dashboard/Dashboard3'
import { NavigationMenu } from './NavBar/NavigationMenu'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ProtectedRoute } from './PrivateRoute'

const App = () => {

  const { user } = useSelector((state: RootState) => state)
  
  
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />

      </Routes>
    </BrowserRouter>
  )
}
export default App
