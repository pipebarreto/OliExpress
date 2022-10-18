import { AppBar, Grid } from '@mui/material'
import { Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import CartList from './CartList'
import UserDetails from './UserDetails'
import Logging from './Logging'
import SignUp from './SignUp';


export function NavBar() {

  const userInfo:any = localStorage.getItem('authUser');
  const user=JSON.parse(userInfo);

    const loggingIn = async (user: any) =>{
      const res =await axios.post(
        'http://localhost:4000/api/v1/login2',
        {"email":user.email, "password":user.password
        }
      )
      const token =res.data.token;
      const authUser = jwtDecode(token);
      localStorage.setItem('authUser', JSON.stringify(authUser))
      localStorage.setItem('token', token)
      window.location.reload();
  }

  const signUp = async (user: any) =>{
    const res =await axios.post(
      'http://localhost:4000/api/v1/signup',
      {"email":user.email, "password":user.password
      }
    )
    const token =res.data.token;
    const authUser = jwtDecode(token);
    localStorage.setItem('authUser', JSON.stringify(authUser))
    localStorage.setItem('token', token)
    window.location.reload();
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
            style={{color: "#ffd6c9"}}
            component="div"
            sx={{ flex: 1 }}>
            Welcome to OliExpress!
          </Typography>
          {user?
          <CartList />:
          <div style={{display:"flex "}}>
          <Logging loggingIn={loggingIn}/>
          <SignUp newUser={signUp}/>
          </div>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
