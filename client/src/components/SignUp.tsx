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

export default function CreateProduct({ newUser}:any) {
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
    newUser(user);
    setUser({
        email:'',
        password:'',
    })

    setOpen(false);
  };

  const inputChanged=(event: any)=>{
      setUser({...user, [event.target.name]: event.target.value});
  }
  /*const inputChanged = (event:any) => {
    setProductName(event.target.value);
  };*/

  return (
    <div>
      <Button sx={{fontSize: 20, paddingBottom:'10px'}} onClick={handleClickOpen}
          endIcon ={<AddIcon />}
          >Create Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name='Email'
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
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}