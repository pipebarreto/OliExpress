import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Product } from 'types';
import { FormControl, InputLabel } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import LoginIcon from '@mui/icons-material/Login';

export default function Logging({ loggingIn}:any) {
  const [open, setOpen] = React.useState(false);
  const[user, setUser]=React.useState({
      email:'',
      password:''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () => {
    loggingIn(user);
    setUser({
        email:'',
        password:'',
    })

    setOpen(false);
  };

  const inputChanged=(event: any)=>{
      setUser({...user, [event.target.name]: event.target.value});
  }

  const handleGoogleOnSuccess = async (response: CredentialResponse) =>{
    if (response.credential){
      const res =await axios.post(
        'http://localhost:4000/api/v1/login',
        {},
        {
          headers:{
            id_token: response.credential,
          }
        }
      )
      const token =res.data.token;
      const authUser = jwtDecode(token);
      localStorage.setItem('authUser', JSON.stringify(authUser))
      localStorage.setItem('token', token)
      window.location.reload();
    }
  }

  return (
    <div style={{paddingRight:20}}>
      <Button variant="outlined" color='inherit' sx={{fontSize: 20}} onClick={handleClickOpen}
          endIcon ={<LoginIcon />}
          >Log In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            margin="dense"
            name='email'
            value={user.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='password'
            type="password"
            value={user.password}
            onChange={inputChanged}
            label="password"
            fullWidth
            variant="standard"
          />

          <div style={{paddingTop:'25px'}}>
            <Button fullWidth variant="contained" onClick={handleSave}endIcon ={<LoginIcon />}>
             Log in 
            </Button> 
          </div>

          <div style={{display: 'flex', justifyContent: 'center', paddingTop:'25px'}}>
          <GoogleLogin
            onSuccess={handleGoogleOnSuccess} 
            onError={() => {
            console.log('Login Failed')
            }}
          />
          </div>
         
        </DialogContent>
        <DialogActions/>
        
      </Dialog>
    </div>
  );
}