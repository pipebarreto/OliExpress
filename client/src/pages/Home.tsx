import { Button, Grid } from "@mui/material"
import { NavBar } from "components/NavBar"
import ProductCard from "components/ProductCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsThunk } from "redux/productSlice"
import { AppDispatch, RootState } from "redux/store"
import { Product } from "types"
import { Content } from "components/Content"
import { SideBar } from "components/SideBar"
import { fetchUserThunk } from "redux/userSlice"

const Home = () => {

  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
      dispatch(fetchUserThunk())
    }, [dispatch])

  

  return (
  <>

  <NavBar />

  <Content />

  </>

  )
}

export default Home