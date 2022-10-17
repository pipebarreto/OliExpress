import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { Box, Typography, IconButton, Avatar, Button, Grid } from '@mui/material'
import MenuSharpIcon from '@mui/icons-material/MenuSharp'
import Divider from '@mui/material/Divider'
import { fetchProductsThunk } from 'redux/productSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import CreateProduct from './CreateProduct'
import { Product } from 'types'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import EditUser from './EditUser'


type Anchor = 'left'

const userInfo:any = localStorage.getItem('authUser');
const user=JSON.parse(userInfo);

export default function UserDetails() {
  
  const dispatch = useDispatch<AppDispatch>()
  const token = localStorage.getItem('token');

  const [state, setState] = React.useState({
    left: false,
  })

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

  const editUser =(updatedUser:any)=>{
    fetch(`http://localhost:4000/api/v1/users/${user.id}`,
      {method:'PUT',
      headers:{'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`},
      body: JSON.stringify(updatedUser)
    })
    .then(response=>{
      if (response.ok) {
        //pending
        } 
      else{
       alert('Something went wrong');}
    })
    .catch(err => console.error(err))
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return
        }

        setState({ ...state, [anchor]: open })
      }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 300 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>

    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end', padding:'5px'}}>
    <Button sx={{fontSize: 20 }}  
          startIcon ={<ArrowBackIcon fontSize='large'/>} onClick={() =>{}}> Close</Button>
    </div>
    
    <Grid paddingX={4}>
    <Avatar alt={user.name}  sx={{ width: 150, height: 150 }} src={user.picture} />


      <Typography variant="h4" style={{ paddingTop: '20px', paddingBottom:'10px' }}>
        {user.name}
      </Typography>
      <Typography variant="h6" style={{ paddingBottom:'5px' }}>
        {user.userId}<br/>
      </Typography>
      
      <EditUser params={user} editUser={editUser}/>

      <Divider />

      <CreateProduct newProduct={addProduct}/>
      
      <Divider />

      <Button sx={{fontSize: 20, paddingTop:'10px'}}  endIcon ={<LogoutIcon />}
                    onClick={() =>{localStorage.removeItem('token');
                    localStorage.removeItem('authUser');
                    window.location.reload();}}>Log Out</Button>
      <List>
       
      </List>
      
    </Grid>
    </Box>
  )

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuSharpIcon />
          </IconButton>
          <Drawer
          variant="persistent"
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
