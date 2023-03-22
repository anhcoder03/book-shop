import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userInfor, setUserInfor] = useState({});
  const value = { userInfor, setUserInfor };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfor(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
