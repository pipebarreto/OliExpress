import { Grid } from "@mui/material"
import { NavBar } from "components/NavBar"
import ProductCard from "components/ProductCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsThunk } from "redux/productSlice"
import { AppDispatch, RootState } from "redux/store"
import { Product } from "types"
import { GoogleLogin } from '@react-oauth/google';

const Home = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state)
  const productList = products.items

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [dispatch])


  return (
  <>

  <NavBar />

  <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed')
  }}
/>


  <Grid container 
        direction="row"
        alignItems="center"
        paddingLeft={20}
        paddingRight={20}
        >

  {productList.map((productList: Product, index: number)=>(

  <ProductCard  key={index} product={productList}/>

  ))} 

  </Grid>
  </>

  )
}

export default Home