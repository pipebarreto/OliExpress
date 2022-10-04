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


export default function ProductCard (props:any){

  const [number, setNumber]= useState(1);
  const invalid = number < 1;

  console.log(props);

  return(   
    
  <div style ={{margin:10}}>

    <Card variant="elevation" sx={{ width: 250, height:'auto', padding:5}}>
    <CardActionArea>

    <CardMedia
        component="img"
        height="140"
        image="https://thumbs.dreamstime.com/z/freeware-badge-vector-white-background-58987663.jpg"
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
          {props.product.price}
        </Typography>

      </CardContent>

      </CardActionArea>

      <CardActions >

      <Grid container direction="column"
        alignItems="center"  justifyContent="end">

        <Grid container direction="row" alignItems="center" justifyContent="center" padding={1}>

          <Button  disabled={invalid} onClick={() => {setNumber(number-1)}}>-</Button>

          <Typography variant="body2" >
            {number}
           </Typography>

          <Button onClick={() => {setNumber(number+1)}}>+</Button>
    
        </Grid>


      <IconButton variant="outlined">
      <ShoppingCart />
        Add to cart
      </IconButton> 
      
      </Grid>
      </CardActions>

    </Card>
    
  </div>

    );
}
