import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import React from 'react';


/*export { PrivateRoute };

function PrivateRoute({ children }:{children: React.ReactNode}) {
    const token
    const authUser = jwtDecode(token);
    
    if (!authUser.isAdmin) {
        // not logged in so redirect to login page with the return url
        return (
        <div>
        <h1> No sir!! </h1>
        </div>)
    }
    
    return children;
}*/