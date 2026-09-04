import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectesRoute({children}) {
const isLogiend = false
if(!isLogiend){
    return <Navigate to='/regester' />
}

  return children


 
}
