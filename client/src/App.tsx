import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from 'pages/home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { Dashboard } from './pages/dashboards/Dashboard'
import { Dashboard2 } from './pages/dashboards/dashboard2/Dashboard2'
import { Dashboard3 } from './pages/dashboards/Dashboard3'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ProtectedRoute } from './components/PrivateRoute'

const App = () => {

  const { user } = useSelector((state: RootState) => state)

  console.log(user);
 
  
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
   
      <Route element={
        <ProtectedRoute redirectPath="/home" isAllowed={ user?.isAdmin} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />
      </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App
