import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedToken ? {token: storedToken} : null);
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfRoom, setNumberOfRoom] = useState(1);
  const [numberOfGuest, setNumberOfGuest] = useState(1);

  return <AuthContext.Provider value={{user, setUser, numberOfAdults, setNumberOfAdults,numberOfRoom, setNumberOfRoom, numberOfGuest, setNumberOfGuest}}>{children}</AuthContext.Provider>;
};


