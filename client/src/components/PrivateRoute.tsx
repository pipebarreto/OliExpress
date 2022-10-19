import {Navigate, Outlet,} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import React from 'react';


export const ProtectedRoute = ({
    children,
    redirectPath = '/home',
    isAllowed,
  }:any) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };