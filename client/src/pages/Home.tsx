import { Grid } from "@mui/material"
import { NavBar } from "components/NavBar"
import ProductCard from "components/ProductCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsThunk } from "redux/productSlice"
import { AppDispatch, RootState } from "redux/store"
import { Product } from "types"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import axios from "axios"
import CreateProduct from "components/CreateProduct"

const Home = () => {

  const dispatch = useDispatch<AppDispatch>()
  const token = localStorage.getItem('token');
  
  const { products } = useSelector((state: RootState) => state)
  const productList = products.items

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [dispatch])

  const handleGoogleOnSuccess = async (response: CredentialResponse) =>{
    console.log('response:', response)
    if (response.credential){
      const res =await axios.post(
        'http://localhost:4000/api/v1/login',
        {},
        {
          headers:{
            id_token: response.credential,
          }
        }
      )
      const token =res.data.token;
      localStorage.setItem('token', token)

      console.log("token" + token);
    }
  }

  console.log("token" +token);

    const addProduct =(newProduct: Product)=>{
      fetch('http://localhost:4000/api/v1/products/',
        {method:'POST',
        headers:{'Content-Type': 'application/json',
                  Authorization:`Bearer ${token}`},
        body: JSON.stringify(newProduct)
      })
      .then(response=>{
        if (response.ok) {
          dispatch(fetchProductsThunk())
          } 
        else{
         alert('Ups! Something went wrong');
        }
      })
      .catch(err => console.error(err))
    }


  return (
  <>

  <NavBar />
    <br/>
  <CreateProduct newProduct={addProduct}/>

  <GoogleLogin
  onSuccess={handleGoogleOnSuccess} 
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