import SearchIcon from '@mui/icons-material/Search';
import { Divider, Grid, IconButton, InputBase, Paper, TextField } from '@mui/material';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { Product } from 'types';
import { OrderBy } from '../../components/OrderBy';
import ProductCard from './productCard/ProductCard';
import { SideBar } from './SideBar';

export function Content(){
    
    const { products } = useSelector((state: RootState) => state)
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [sorting, setSorting] = useState('');


    const inputChanged = (event:any) => {
        setProductName(event.target.value);
      };

      const filtering =(filtering2:string) =>{
        setCategory(filtering2)
      }
      
     const productList = products.items.filter((item)  => {
        return (Object.values(item).join('').toLowerCase().includes(productName.toLowerCase()) &&
        Object.values(item).join('').toLowerCase().includes(category.toLowerCase()))
    }).sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    //a.price-b.price
  )

    return (

  <div style={{backgroundColor: '#FAF7F0'}}>
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'80px', paddingBottom:'15px'}}>
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

      <div style={{position:"fixed", paddingLeft:60, paddingTop:30}}>

    {/*<OrderBy />*/}
    <SideBar  filterCategory={filtering}/>
    </div>
    
    <Grid container direction="row" alignItems="center" paddingLeft={60} paddingRight={5} >
      {productList.map((productList: Product, index: number)=>(
      <ProductCard  key={index} product={productList}/>))} 
    </Grid>
  </div>
  );
}
