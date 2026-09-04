import { createContext, useEffect, useState } from "react";
import { getUserData } from "./pages/Login";
import { Navigate } from "react-router-dom";

 export const UserTokenProvider = createContext()
export function AuthuserContextProvider({ children }) {
    const [userdata, setUserData] = useState(null)

 useEffect(function () {
    // getUserData().then(function(data){setUserData(data)})
    const token = localStorage.getItem('user_token');
    if(token){
        getUserData()
        .then(function (data) {setUserData(data)})
        .catch(function(err){console.log(err);
        })
    }
  
    
 },[])

    return <UserTokenProvider.Provider value={{ userdata, setUserData }}>
        {children}
        </UserTokenProvider.Provider>
}