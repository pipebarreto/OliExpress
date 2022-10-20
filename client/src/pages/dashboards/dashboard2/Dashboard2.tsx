import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { useEffect, useState } from "react";
import { Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserAdmin from './EditUserAdmin';


export function Dashboard2(){

    const[users, setUsers]= useState([]);

    const token = localStorage.getItem('token');

    
    useEffect(()=> fetchData(), []);

  const fetchData =()=>{
    fetch('http://localhost:4000/api/v1/users/',
      {method:'GET',
      headers:{'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`},
    })
    .then(response=>response.json())
    .then(data=>setUsers(data))
    .catch(err => console.error(err))
  }

  const deleteUser =(id:String) => {
    if (window.confirm('Are you sure? Product will be deleted')){
      fetch (`http://localhost:4000/api/v1/users/${id}`, {method: 'DELETE',
      headers:{Authorization:`Bearer ${token}`},
    })
      .then (response =>{
        if (!response.ok){
          alert('Something went wrong');
        }else{
          fetchData();
        }
          return;
      })
      .catch(err=>console.log(err))
    }
  }

  const editUser =(updatedUser:any)=>{
    fetch(`http://localhost:4000/api/v1/users/${updatedUser._id}`,
      {method:'PUT',
      headers:{'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`},
      body: JSON.stringify(updatedUser)
    })
    .then(response=>{
      if (response.ok) {
        fetchData();
        } 
      else{
       alert('Something went wrong');}
    })
    .catch(err => console.error(err))
  }
 
  const columns = [
    {field: '_id', headerName:'Id', sortable: true, filter: true, floatingFilter: true},
    {field: 'picture', headerName:'Picture', cellRenderer: (image: any|undefined)=>
        <Avatar alt={image.value}  sx={{ width: 70, height: 65 }} src={image.value} />},
    {field: 'name', headerName:"Name", sortable: true, filter: true, floatingFilter: true},
    {field: 'email', headerName:'Email', sortable: true, filter: true, floatingFilter: true},
    {field: 'isAdmin', headerName:'Admin Access', sortable: true, filter: true, floatingFilter: true},
    //{field: 'orders', headerName:'Orders', sortable: true, filter: true, floatingFilter: true},
    {
        headerName:'Edit',
        field: '_id',
        cellRenderer:  (id:any) => <EditUserAdmin params={id.data} editUser={editUser} />,
      },{
        headerName:'Delete',
        field: '_id',
        cellRenderer: (id:any) => <IconButton color="error"
        onClick ={() => {deleteUser(id.data._id)}}>
          <DeleteIcon />
        </IconButton>
      } 
      
  ]

    return(

        <div className="ag-theme-material" style ={{height:860, width: '100%', paddingTop:80}}>

        <AgGridReact
          //onGridReady={onGridReady}
          rowData={users}
          columnDefs={columns}
          rowHeight={75}
          suppressCellFocus={true}
          minColWidth={272}
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