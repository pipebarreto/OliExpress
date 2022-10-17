import SearchIcon from '@mui/icons-material/Search';
import { Divider, Grid, IconButton, InputBase, Paper, TextField } from '@mui/material';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from 'redux/productSlice';
import { AppDispatch, RootState } from 'redux/store';
import { Product } from 'types';
import ProductCard from './ProductCard';
import { SideBar } from './SideBar';

export function Content(){
    
    const dispatch = useDispatch<AppDispatch>()

    const { products } = useSelector((state: RootState) => state)

    const [productName, setProductName] = useState('');

    useEffect(() => {
        dispatch(fetchProductsThunk())
      }, [dispatch])

    const inputChanged = (event:any) => {
        setProductName(event.target.value);
      };

     const productList = products.items.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(productName.toLowerCase())
    })

    return (

  <div>
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'80px'}}>
        <Paper elevation={10}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}>

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search in the store"
            value={productName}
            onChange={inputChanged}
           />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
    </div>  

    <SideBar />
    
    <Grid container direction="row" alignItems="center" paddingLeft={20} paddingRight={20} >
      {productList.map((productList: Product, index: number)=>(
      <ProductCard  key={index} product={productList}/>))} 
    </Grid>
  </div>
  );
}
