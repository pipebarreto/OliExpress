import { NavBar } from "components/NavBar/NavBar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchProductsThunk } from "redux/productSlice"
import { AppDispatch } from "redux/store"
import { Content } from "pages/home/Content"

const Home = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
      dispatch(fetchProductsThunk())
    }, [dispatch])

  return (
  <>

  <Content />

  </>

  )
}

export default Home