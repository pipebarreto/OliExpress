import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import { NavBar } from './NavBar'
import { Dashboard } from './Dashboard'
import { Dashboard2 } from './Dashboard2'
import { Dashboard3 } from './Dashboard3'
import { NavigationMenu } from './NavigationMenu'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const App = () => {

  const { user } = useSelector((state: RootState) => state)
  
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
