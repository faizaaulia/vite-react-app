import React from 'react';
import { useState } from 'react';

const authUser = {
  email: null,
  id: null,
  isLogin: false
}

export const AuthContext = React.createContext(authUser);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authUser);

  const setAuthUser = (value) => {
    setUser(value);
  }

  return (
    <AuthContext.Provider value={{ user, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;