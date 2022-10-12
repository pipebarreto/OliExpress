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

export default function CreateProduct({ newProduct}:any) {
  const [open, setOpen] = React.useState(false);
  const[product, setProduct]=React.useState({
      name:'',
      description:'',
      category: '',
      image: '',
      price: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () => {
    newProduct(product);
    setProduct({
        name:'',
        description:'',
        category: '',
        image: '',
        price: ''
    })

    setOpen(false);
  };

  const inputChanged=(event: any)=>{
      setProduct({...product, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}
          endIcon ={<AddIcon />}
          >Create Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name='name'
            value={product.name}
            onChange={inputChanged}
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline={true}
            margin="dense"
            name='description'
            value={product.description}
            onChange={inputChanged}
            label="Description"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='image'
            value={product.image}
            onChange={inputChanged}
            label="Image (URL)"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='price'
            value={product.price}
            onChange={inputChanged}
            label="Price"
            fullWidth
            variant="standard"
          />

        <FormControl variant="standard" sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
                    name='category'
                    value={product.category}
                    onChange={inputChanged}
                    fullWidth
                    label="Price"
                    variant="standard">
            <MenuItem value={'Other'}>Other</MenuItem>
          <MenuItem value={'Technology'}>Technology</MenuItem>
          <MenuItem value={'Fashion'}>Fashion</MenuItem>
          <MenuItem value={'Toys'}>Toys</MenuItem>
          <MenuItem value={'Furniture'}>Furniture</MenuItem>
        </Select>
        </FormControl>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}