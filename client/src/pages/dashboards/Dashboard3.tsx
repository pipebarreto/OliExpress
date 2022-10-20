import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProduct from '../home/productCard/EditProduct';
import { Product } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { fetchProductsThunk } from 'redux/productSlice';
import { useEffect } from 'react';


export function Dashboard3(){

    const token = localStorage.getItem('token');
    
    const dispatch = useDispatch<AppDispatch>()
    const { products } = useSelector((state: RootState) => state)

    const productList = products.items;

    useEffect(() => {
      dispatch(fetchProductsThunk())
    }, [dispatch])

  const deleteProduct =(id:string) => {
    if (window.confirm('Are you sure? Product will be deleted')){
      fetch (`http://localhost:4000/api/v1/products/${id}`, {method: 'DELETE',
      headers:{Authorization:`Bearer ${token}`},
    })
      .then (response =>{
        if (!response.ok){
          alert('Something went wrong');
        }else{
          dispatch(fetchProductsThunk())
        }
          return;
      })
      .catch(err=>console.log(err))
    }
  }

  const editProduct =(updatedProduct:Product, id:string)=>{
    fetch(`http://localhost:4000/api/v1/products/${updatedProduct._id}`,
      {method:'PUT',
      headers:{'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`},
      body: JSON.stringify(updatedProduct)
    })
    .then(response=>{
      if (response.ok) {
        dispatch(fetchProductsThunk())
        } 
      else{
       alert('Something went wrong');}
    })
    .catch(err => console.error(err))
  }

  
  const columns = [
    {field: '_id', headerName:'Id', sortable: true, filter: true, floatingFilter: true},
    {field: 'image', headerName:'Image', cellRenderer: (image: any|undefined)=> 
        <Avatar alt={image.value}  sx={{ width: 70, height: 65 }} src={image.value} />},
    {field: 'name', headerName:'Name', sortable: true, filter: true, floatingFilter: true},
    {field: 'description', headerName:"Description", sortable: true, filter: true, floatingFilter: true},
    {field: 'price', headerName:'Price', sortable: true, filter: true, floatingFilter: true},
    {field: 'category', headerName:'Category', sortable: true, filter: true, floatingFilter: true},
    //{field: 'orders', headerName:'Orders', sortable: true, filter: true, floatingFilter: true},
    {
        headerName:'Edit',
        width: 120,
        field: '_id',
        cellRenderer:  (id:any) => <EditProduct params={id.data} editProduct={editProduct} />,
      },{
        headerName:'Delete',
        width: 120,
        field: '_id',
        cellRenderer: (id:any) => <IconButton color="error"
        onClick ={() => {deleteProduct(id.data._id)}}>
          <DeleteIcon />
        </IconButton>
      }
  ]

    return(

        <div className="ag-theme-material" style ={{height:860, width: '100%', paddingTop:80}}>

        <AgGridReact
          //onGridReady={onGridReady}
          rowData={productList}
          columnDefs={columns}
          rowHeight={75}
          suppressCellFocus={true}
          minColWidth={240}
          animateRows={true}
          rowSelection="single"
          pagination={true}
          paginationAutoPageSize={true}
          defaultColDef={{
            cellStyle: () => ({
              display: 'flex',
              alignItems: 'center',
            }),
          }}
        />
      </div>
    )
}