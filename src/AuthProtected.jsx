import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthProtected({children}) {


    if(localStorage.getItem('user_token')){
        return <Navigate to='/' /> 
    }
  return (
    children
  )
}
