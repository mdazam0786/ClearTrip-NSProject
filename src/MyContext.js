import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedToken ? {token: storedToken} : null);


  return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>;
};


