import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedName = localStorage.getItem("name");
  const [user, setUser] = useState(storedToken ? {token: storedToken, name: storedName} : null);
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfRoom, setNumberOfRoom] = useState(1);
  const [numberOfGuest, setNumberOfGuest] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    if(storedToken){
      setUser({token: storedToken, name: storedName});
    }
    else {
      setUser(null);
    }
  },[storedToken]);
  return <AuthContext.Provider value={{user, setUser, numberOfAdults, setNumberOfAdults,numberOfRoom, setNumberOfRoom, numberOfGuest, setNumberOfGuest}}>{children}</AuthContext.Provider>;
};


