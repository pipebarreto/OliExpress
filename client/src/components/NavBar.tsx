import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import CartList from './CartList'
import UserDetails from './UserDetails'
import Loging from './Loging'


export function NavBar() {

  const userInfo:any = localStorage.getItem('authUser');
  const user=JSON.parse(userInfo);

  const loggingIn = async (user: any) =>{
    console.log('response!!:', user)
    fetch('http://localhost:4000/api/v1/login2/',
    {method:'POST',

    body: JSON.stringify(user)
  })
  .then(response=>{
    if (response.ok) {
      console.log(response);
      } 
    else{
     alert('Ups! Something went wrong');
    }
  })
  .catch(err => console.error(err))
  }


  return (
    <div>
      <AppBar position=	'fixed' color="primary" enableColorOnDark>
        <Toolbar>
          {user &&(
          <UserDetails />)
          }
          <Typography
            align="center"
            variant="h4"
            noWrap
            component="div"
            sx={{ flex: 1 }}>
            Welcome to OliExpress!
          </Typography>
          {user?
          <CartList />:
          <Loging loggingUser={loggingIn}/>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
