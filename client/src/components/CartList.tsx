import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, IconButton, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { AppDispatch, RootState } from '../redux/store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import Badge from '@mui/material/Badge'
import { useEffect, useState } from 'react'
import { Order } from 'types'
import { Snackbar } from '@mui/material';
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { fetchUserThunk } from 'redux/userSlice'


type Anchor = 'right'

export default function () {
    const dispatch = useDispatch<AppDispatch>()
    const token = localStorage.getItem('token');


  const { user } = useSelector((state: RootState) => state)
  const orderList = user.orders;

  const [open, setOpen]= useState(false);
 
  const total = (orderList.reduce((a,v) =>  a = a + v.total_price , 0 ));

    useEffect(() => {
        dispatch(fetchUserThunk())
        }, [dispatch])
  
  const deleteFromCart =(orderId: String)=>{
    const body={
      userId: user._id,
    }
      axios.delete(`http://localhost:4000/api/v1/orders/${orderId}`,{
    headers:{
      Authorization:`Bearer ${token}`
    },
    data: body,
  })  
    .then(response=>{
      if (response.status==204) {
        dispatch(fetchUserThunk())
        setOpen(true);
        } 
      else{
       alert('Something went wrong');
      }
    })
    .catch(err => console.error(err))
  }



  const [state, setState] = React.useState({
    right: false})

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')) {
          return}
        setState({ ...state, [anchor]: open })
      }

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 300, padding: '10px' }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>

      <List>
        <Typography variant="h4" style={{ padding: '10px', color:"blue" }}>
          Cart List
        </Typography>
        <Divider />

        {orderList.length === 0 && (
          <Typography variant="h6" style={{ padding: '10px' }}>
            Nothing to show
          </Typography>)}

        {orderList.map((item: Order, index) => {

          return (
            <div style={{ padding: '2px' }}>
               <ListItem
            key={index}
            secondaryAction={
              <IconButton size="small" color="error" 
              onClick={() => deleteFromCart(item._id)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={item.product._id}
                  src={item.product.image}
                />
              </ListItemAvatar>
              <ListItemText  primary={`${item.product.name}: ${item.quantity}pcs`}
                              secondary={`Total: €${item.total_price}`} 
                              />
            </ListItemButton>
          </ListItem>
            </div>
          )
        })}

        <Divider />
        <Typography variant="h5" style={{ paddingInline: '10px', paddingBlock: '20px', color:"blue" }}>
           Total to pay: € {total}
          </Typography>
        <IconButton color="success" style={{ padding: '10px' }}>
          <ShoppingCartIcon />
          Check out
        </IconButton>
      </List>


    </Box>
  )

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton style={{color: '#c1eff4'}} onClick={toggleDrawer(anchor, true)}>
            <Badge color="warning" badgeContent={orderList.length}>
              Cart
              <ShoppingCartIcon/>
            </Badge>
          </IconButton>
          
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}

          </Drawer>
        </React.Fragment>
      ))}

  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={()=> setOpen(false)}
    message ="Product removed from cart"
    />

    </div>
  )
}
