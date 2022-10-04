import { NavBar } from "components/NavBar"
import ProductCard from "components/ProductCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsThunk } from "redux/productSlice"
import { AppDispatch, RootState } from "redux/store"
import { Product } from "types"

const Home = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state)
  const productlist = products.items


  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [dispatch])


  return (
  <>
  <NavBar />

  {productlist.map((productlist: Product, index: number)=>(

  <ProductCard  key={index}  product={productlist}/>

  ))} 
  </>

  )
}

export default Home