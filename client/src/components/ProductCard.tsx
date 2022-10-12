import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardMedia, Grid } from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/Button'
import axios from "axios";
import { fetchOrdersThunk } from "redux/orderSlice";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "redux/store";
import { Snackbar } from '@mui/material';
import { fetchProductsThunk } from "redux/productSlice";
import EditProduct from "./EditProduct";
import { Product } from "types";
import DeleteIcon from '@mui/icons-material/Delete';


export default function ProductCard (props:any){

  const dispatch = useDispatch<AppDispatch>()
  const token = localStorage.getItem('token');

  const [quantity, setQuantity]= useState(1);
  const invalid = quantity <= 1;

  const [open, setOpen]= useState(false);

  const addToCart =(productId: String, quantity: number)=>{
    const body={
      product: productId,
      quantity: quantity,
    }


    fetch('http://localhost:4000/api/v1/orders',
      {method:'POST',
      headers:{'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`},
      body: JSON.stringify(body)
    })
    .then(response=>{
      if (response.ok) {
        dispatch(fetchOrdersThunk());
        setOpen(true);
        } 
      else{
       alert('Something went wrong');
      }
    })
    .catch(err => console.error(err))
  }

  const editProduct =(updatedProduct:Product)=>{
    console.log(props.product._id)
    fetch(`http://localhost:4000/api/v1/products/${props.product._id}`,
      {method:'PUT',
      headers:{'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`},
      body: JSON.stringify(updatedProduct)
    })
    .then(response=>{
      if (response.ok) {
        dispatch(fetchProductsThunk())
        } 
      else{
       alert('Something went wrong');}
    })
    .catch(err => console.error(err))
  }

  const deleteProduct =() => {
    if (window.confirm('Are you sure? Product will be deleted')){
      fetch (`http://localhost:4000/api/v1/products/${props.product._id}`, {method: 'DELETE',
      headers:{Authorization:`Bearer ${token}`},
    })
      .then (response =>{
        if (!response.ok){
          alert('Something went wrong');
        }else{
          dispatch(fetchProductsThunk())
        }
          return;
      })
      .catch(err=>console.log(err))
    }
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

        <Typography variant="body1" color="text.secondary">
          <br/>€{props.product.price}
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

      <Grid container direction="row" alignItems="center" justifyContent="center" padding={1}>
      <EditProduct params={props} editProduct={editProduct} />
      
      <IconButton color="error" onClick ={() => deleteProduct ()}><DeleteIcon />
      </IconButton> 
        </Grid>

      
      </Grid>
      </CardActions>
    </Card>

  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={()=> setOpen(false)}
    message ="Product succesfully added to cart!"
    />
    
  </div>

    );
}
