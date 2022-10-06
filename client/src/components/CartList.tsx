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
import { useEffect } from 'react'
import { fetchOrdersThunk } from 'redux/orderSlice'


type Anchor = 'right'

export default function () {
    const dispatch = useDispatch<AppDispatch>()
  const { orders } = useSelector((state: RootState) => state)
  const orderList = orders.items

    useEffect(() => {
        dispatch(fetchOrdersThunk())
        }, [dispatch])
  
  const deleteFromCart =(orderId: String)=>{
    fetch('http://localhost:4000/api/v1/orders',
      {method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(`_id: ${orderId}`)
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

  const [state, setState] = React.useState({
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')) {
          return
        }
        setState({ ...state, [anchor]: open })
      }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 300, padding: '10px' }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>

      <List>
        <Typography variant="h4" style={{ padding: '10px' }}>
          Cart List
        </Typography>

        <Divider />

        {orderList.length === 0 && (
          <Typography variant="h6" style={{ padding: '10px' }}>
            Nothing to show
          </Typography>)}

        {orderList.map((item, index) => {

          return (
            <div style={{ padding: '2px' }}>
              {item.product.name} x {item.quantity}
              <IconButton color="error"  onClick={() => deleteFromCart(orders._id)}> <DeleteIcon />
              </IconButton>
            </div>
          )
        })}

        <Divider />
        <IconButton color="success" style={{ padding: '20px' }}>
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
    </div>
  )
}
