import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


export function Dashboard(){

    const[orders, setOrders]= useState([]);

    const token = localStorage.getItem('token');

    
    useEffect(()=> fetchData(), []);


  const fetchData =()=>{
    fetch('http://localhost:4000/api/v1/orders/',
      {method:'GET',
      headers:{'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`},
    })
    .then(response=>response.json())
    .then(data=>setOrders(data))
    .catch(err => console.error(err))
  }

  const deleteOrder =(orderId: String, ownerId:String)=>{
    if (window.confirm('Are you sure? This action can not be undone')){
        const body={
            userId: ownerId}
              axios.delete(`http://localhost:4000/api/v1/orders/${orderId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                  },
                  data: body,
                })  
            .then(response=>{
              if (response.status==204) {
                fetchData();
                } 
              else{
               alert('Something went wrong');
              }
            })
        }   
    }

  
  const columns = [
    {field: '_id', headerName:'Order id', sortable: true, filter: true, floatingFilter: true},
    {field: 'product._id', headerName:'Product id', sortable: true, filter: true, floatingFilter: true},
    {field: 'product.name', headerName:'Product Name', sortable: true, filter: true, floatingFilter: true},
    {field: 'quantity', headerName:'Quantity', sortable: true, filter: true, floatingFilter: true},
    {field: 'ownerId._id', headerName:'Customer id', sortable: true, filter: true, floatingFilter: true},
    {field: 'ownerId.email', headerName:'Customer email', sortable: true, filter: true, floatingFilter: true},
    {field: 'total_price', headerName:'Total Price', sortable: true, filter: true, floatingFilter: true}, {
      headerName:'Delete',
      field: '',
      cellRenderer: (id:any) => <IconButton color="error"
      onClick ={() => {deleteOrder(id.data._id, id.data.ownerId)}}>
        <DeleteIcon />
      </IconButton>
    }       
  ]

    return(

        <div className="ag-theme-material" style ={{height:860, width: '100%', paddingTop:80}}>

        <AgGridReact
          //onGridReady={onGridReady}
          rowData={orders}
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