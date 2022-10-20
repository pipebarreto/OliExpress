import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { useEffect, useState } from "react";
import { Avatar } from '@material-ui/core';
import {  BrowserRouter,  Routes,  Route,   Link, NavLink} from"react-router-dom";
import { Dashboard } from '../../pages/dashboards/Dashboard';
import { Dashboard3 } from '../../pages/dashboards/Dashboard3';
import Home from 'pages/home/Home';
import { Dashboard2 } from '../../pages/dashboards/dashboard2/Dashboard2';


export function NavigationMenu(){

    return(
        <div style={{paddingLeft:30}}>

    <NavLink
    to="/home"
    style={({ isActive }) => (isActive ? {
      color:'#81c784',
      fontWeight: 'bold',
      padding: '40px',} : 
    { color:'white', padding: '25px',})}>
    Home
</NavLink>

<NavLink
    to="/dashboard"
    style={({ isActive }) => (isActive ? {
      color:'#81c784',
      fontWeight: 'bold',
      padding: '40px',} : 
    {color:'white', padding: '25px',})}>
    Orders
</NavLink>
<NavLink
    to="/dashboard2"
    style={({ isActive }) => (isActive ? {
      color:'#81c784',
      fontWeight: 'bold',
      padding: '40px',} : 
    {color:'white', padding: '25px',})}>
    Users
</NavLink>
<NavLink
    to="/dashboard3"
    style={({ isActive }) => (isActive ? {
      color:'#81c784',
      fontWeight: 'bold',
      padding: '40px',} : 
    {color:'white', padding: '25px',})}>
    Products
</NavLink>
      



</div>
)
}