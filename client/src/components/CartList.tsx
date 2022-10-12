import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, IconButton } from '@mui/material'
import { AppDispatch, RootState } from '../redux/store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import Badge from '@mui/material/Badge'
import { useEffect, useState } from 'react'
import { fetchOrdersThunk } from 'redux/orderSlice'
import { Order } from 'types'
import { Snackbar } from '@mui/material';


type Anchor = 'right'

export default function () {
    const dispatch = useDispatch<AppDispatch>()
    const token = localStorage.getItem('token');

  const { orders } = useSelector((state: RootState) => state)
  const orderList = orders.items;

  const [open, setOpen]= useState(false);
 
  const total = (orderList.reduce((a,v) =>  a = a + v.total_price , 0 ));


    useEffect(() => {
        dispatch(fetchOrdersThunk())
        }, [dispatch])
  
  const deleteFromCart =(orderId: String)=>{
    fetch(`http://localhost:4000/api/v1/orders/${orderId}`,
      {method:'DELETE',
      headers:{Authorization:`Bearer ${token}`},
    })
    .then(response=>{
      if (response.ok) {
        dispatch(fetchOrdersThunk())
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
              <Typography variant="h6" style={{ paddingInline: '10px', paddingBlock: '5px' }}>
              {item.product.name}:  {item.quantity}pcs <br/> Total: € {item.total_price}
              </Typography>

              <IconButton size="small" color="error"  onClick={() => deleteFromCart(item._id)}> <DeleteIcon />
              Delete from Cart
              </IconButton>
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
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Badge badgeContent={orderList.length} color="secondary">
              Cart
              <ShoppingCartIcon />
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
