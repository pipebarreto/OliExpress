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
import EditIcon from '@mui/icons-material/Edit';

export default function EditUser({params, editUser}:any) {
  const [open, setOpen] = React.useState(false);

  const[user, setUser]=React.useState({
      name:params.name,
      address:params.address
  });

  const handleClickOpen = () => {
    setUser({
        name:params.name,
        address:params.address
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () => {
    editUser(user);
    setUser({
        name:'',
        address:''
    })

    setOpen(false);
  };

  const inputChanged=(event: any)=>{
      setUser({...user, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <Button sx={{fontSize: 20 , paddingTop:'10px'}} onClick={handleClickOpen}
          endIcon ={<EditIcon />}
          >Edit Info
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name='name'
            value={user.name}
            onChange={inputChanged}
            label="Name"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name='address'
            value={user.address}
            onChange={inputChanged}
            label="Address"
            fullWidth
            variant="standard"
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