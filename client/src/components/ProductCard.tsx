import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardMedia, Grid } from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/Button'
import { Product } from "types";
import axios from "axios";
import { fetchOrdersThunk } from "redux/orderSlice";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "redux/store";


export default function ProductCard (props:any){

  const dispatch = useDispatch<AppDispatch>()

  const [quantity, setQuantity]= useState(1);
  const invalid = quantity <= 1;


  /*const addToCart: any (
  async () => {
    const URL = `http://localhost:4000/api/v1/orders`
    const response = await axios.post(URL)

    return {
      data: response.data,
      status: response.status,
    }
  )*/

  const addToCart =(productId: String, quantity: number)=>{
    const body={
      product: productId,
      quantity: quantity,
    }


    fetch('http://localhost:4000/api/v1/orders',
      {method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response=>{
      console.log(response)
      if (response.ok) {
        dispatch(fetchOrdersThunk())
        } 
      else{
       alert('Something went wrong');
      }
    })
    .catch(err => console.error(err))
  }

  return(   
    
  <div style ={{margin:20}}>

    <Card variant="elevation" sx={{ width: 250, height:'auto', padding:5}}>
    <CardActionArea>

    <CardMedia
        component="img"
        height="140"
        image={props.product.image}
        alt="free ware"
      />
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {props.product.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          €{props.product.price}
        </Typography>

      </CardContent>

      </CardActionArea>

      <CardActions >

      <Grid container direction="column"
        alignItems="center"  justifyContent="end">

        <Grid container direction="row" alignItems="center" justifyContent="center" padding={1}>

          <Button  disabled={invalid} onClick={() => {setQuantity(quantity-1)}}>-</Button>

          <Typography variant="body2" >
            {quantity}
           </Typography>

          <Button onClick={() => {setQuantity(quantity+1)}}>+</Button>
    
        </Grid>


      <IconButton variant="outlined" onClick={() => addToCart(props.product._id, quantity)}>
      <ShoppingCart />
        Add to cart
      </IconButton> 
      
      </Grid>
      </CardActions>

    </Card>
    
  </div>

    );
}
