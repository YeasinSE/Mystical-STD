"use client"
import routes from '@/routes';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';


type AuthContextType  ={
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({isLoggedIn:false,login:() =>{} ,logout:()=>{} }); // Initial value can be anything

export const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic later
    const router = useRouter()
  const login = () => {
    setIsLoggedIn(true)
    router.push(routes.dashboard)
  };
  const logout = () => {
    setIsLoggedIn(false)
    router.push(routes.auth.login)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>{
    const auth = useContext(AuthContext);
    return auth
}