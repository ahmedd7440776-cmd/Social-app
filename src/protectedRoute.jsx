import { useContext } from 'react'
import { UserTokenProvider } from './AuthUserContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
// const token = localStorage.getItem('user_token')

// if(!token){
//     return <Navigate to='/login' replace/>
// }
// return children




if(localStorage.getItem('user_token')){



    return children
}
return <Navigate to='/login'/>

  
}
