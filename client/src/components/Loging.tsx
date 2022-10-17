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

export default function Logging({ loggingUser}:any) {
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
    loggingUser(user);
    setUser({
        email:'',
        password:'',
    })

    setOpen(false);
  };

  const handleGoogleOnSuccess = async (response: CredentialResponse) =>{
    console.log('response:', response)
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

  const inputChanged=(event: any)=>{
      setUser({...user, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <Button sx={{fontSize: 20, paddingBottom:'10px'}} onClick={handleClickOpen}
          endIcon ={<AddIcon />}
          >Log In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Log In</DialogTitle>
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
            multiline={true}
            margin="dense"
            name='password'
            value={user.password}
            onChange={inputChanged}
            label="password"
            fullWidth
            variant="standard"
          />

<GoogleLogin
            onSuccess={handleGoogleOnSuccess} 
            onError={() => {
            console.log('Login Failed')
            }}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>

        
      </Dialog>
    </div>
  );
}