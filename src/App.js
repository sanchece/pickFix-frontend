import React, { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import Navbar from "./routes/Navbar";
import useLocalStorage from "./customHooks/useLocalStorage";
import jwt from "jsonwebtoken";

import pickFixApi from "./api";

import UserContext from "./userContext";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);

  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
 
    async function mountUser() {
      if (token) {
        console.log("token found & decoded:", jwt.decode(token));
  
        try {
          let { id, userType } = jwt.decode(token);
          pickFixApi.token = token;
          let currentUser = await pickFixApi.getCurrentUser(id, userType);
          currentUser["userType"]=userType;
          console.log(`in App,currentuser:`,currentUser)          
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("Problem loading current user", err);
          setCurrentUser(null);
        }
      } else {
        console.log("no token found");
      }
      setInfoLoaded(true);

    }
    setInfoLoaded(false);
    mountUser();
   
  }, [token]);

  async function signUp(data) {
    try {
      let res = await pickFixApi.signUp(data);
      setToken(res);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }
  async function logIn(data) {
    try {
      let res = await pickFixApi.logIn(data);

      setToken(res);
      console.log(token);

      return { success: true, res:res };
    } catch (err) {
      return { success: false, err };
    }
  }

  function logOut() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return (<div> loading</div>)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser,setCurrentUser }}>
        <div>
          <Navbar logOut={logOut} />
          <Routes signUp={signUp} logIn={logIn} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
