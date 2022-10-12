import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Product } from 'types';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/Button';

export default function EditProduct({params, editProduct}:any) {
  const [open, setOpen] = React.useState(false);
  params=params.product;
  const[product, setProduct]=React.useState({
      name:params.name,
      description:params.description,
      category:params.category,
      image:params.image,
      price:params.price
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () => {
    editProduct(product);
    setOpen(false);
  };

  const inputChanged=(event: any)=>{
      setProduct({...product, [event.target.name]: event.target.value});
  }

  return (
    <div>
        <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
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
            name='category'
            value={product.category}
            onChange={inputChanged}
            label="Category"
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


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}