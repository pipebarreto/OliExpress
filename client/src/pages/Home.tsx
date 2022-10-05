import { Grid } from "@mui/material"
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

  <Grid container 
        direction="row"
        alignItems="center"
        paddingLeft={20}
        paddingRight={20}
        >

  {productlist.map((productlist: Product, index: number)=>(

  <ProductCard  key={index}  product={productlist}/>

  ))} 

  </Grid>
  </>

  )
}

export default Home