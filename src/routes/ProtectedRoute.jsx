import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Auth } from '../context/AuthContext'

const ProtectedRoute = () => {

    let {loggedInUser} = useContext(Auth);

    if(!loggedInUser){
        return <Navigate to="/" replace />;
    }
  return <Outlet/>
}

export default ProtectedRoute
