import React from 'react';
import { Navigate } from 'react-router-dom';

const user = {
    name: 'Faiz',
    address: 'Malang',
    isLogin: false
}

const AuthContext = React.createContext(user);

const RequiredAuth = ({children}) => {
    return user.isLogin ? children : <Navigate to='/login' />
}

export { AuthContext, RequiredAuth }