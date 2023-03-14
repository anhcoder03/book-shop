import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if(user) {
      setUserInfo(user)
    }
  }, [])

  const values = {userInfo, setUserInfo, user}

  return <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
}

function useAuth () {
  const context = useContext(AuthContext)
  if(typeof context === "undefined") throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export {AuthProvider, useAuth}