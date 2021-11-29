import React, { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import Navbar from "./routes/Navbar";
import useLocalStorage from "./customHooks/useLocalStorage";
import jwt from "jsonwebtoken";

import pickFixApi from "./api";
function App() {
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);


  
  useEffect(
    function mountUser(){
      if(token){
        console.log("if token:", token)
        let {email}= jwt.decode(token);
        pickFixApi.token = token;
        
        console.log("in mountUser api token: ",pickFixApi.token)

        
      }
      else{
        console.log("no token")
      }
    }
  )

  async function signUp(data){
    try{
      let res= await pickFixApi.signUp(data);
      setToken(res);
      return {success:true};
    }
    catch(err){
      return{success:false,err}
    }
  }
  async function logIn(data){
    try{
      let res= await pickFixApi.logIn(data);

      setToken(res);
      return {success:true};
    }
    catch(err){
      return{success:false,err}
    }
  }


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes signUp={signUp} logIn={logIn} />
    </BrowserRouter>

  );
}

export default App;
