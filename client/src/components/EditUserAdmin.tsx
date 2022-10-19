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

export default function EditUserAdmin({params, editUser}:any) {
  const [open, setOpen] = React.useState(false);

  const[user, setUser]=React.useState({
      name:params.name,
      address:params.address,
      picture:params.picture,
      email:params.email,
      isAdmin:params.isAdmin,
      _id:params._id
  });

  const handleClickOpen = () => {
    setUser({
        name:params.name,
        address:params.address,
        picture:params.picture,
        email:params.email,
        isAdmin:params.isAdmin,
        _id:params._id
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
        address:'',
        picture:'',
        email:'',
        isAdmin:'',
        _id:''
    })

    setOpen(false);
  };

  const inputChanged=(event: any)=>{
      setUser({...user, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <Button sx={{fontSize: 20 , paddingTop:'10px'}} onClick={handleClickOpen}
          endIcon ={<EditIcon />}>
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
            name='picture'
            value={user.picture}
            onChange={inputChanged}
            label="Picture"
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
            <TextField
            margin="dense"
            name='email'
            value={user.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
          />
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-filled-label">Admin Access</InputLabel>
        <Select
                    name='isAdmin'
                    value={user.isAdmin}
                    onChange={inputChanged}
                    fullWidth
                    label="Admin Access"
                    variant="standard">
              <MenuItem value={'false'}>False</MenuItem>
            <MenuItem value={'true'}>True</MenuItem>
        </Select>
        </FormControl>

        <TextField
            margin="dense"
            name='_id'
            disabled
            value={user._id}
            onChange={inputChanged}
            label="User id"
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