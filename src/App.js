import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./routes/Routes";
import Navigation from "./routes/Navbar";
import useLocalStorage from "./customHooks/useLocalStorage";
import jwt from "jsonwebtoken";
import pickFixApi from "./api";
import UserContext from "./userContext";
import { Container } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    async function mountUser() {
      if (token) {
        console.log("token found & decoded:", jwt.decode(token));
        try {
          getUserLocation();
          let { id, userType } = jwt.decode(token);
          pickFixApi.token = token;
          let currentUser = await pickFixApi.getCurrentUser(id, userType);
          currentUser["userType"] = userType;
          console.log(`in App,myLocation:`, myLocation);
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

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(async function (position) {
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,        
      });
      let { id, userType } = jwt.decode(token);
      let data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        // lat: 1,
        // lng: 2,
        userType: userType,
      };
      let res = await pickFixApi.addLocation(data, id);
    });
    // setMyLocation({
    //   lat:42.332,
    //   lng: -83.057
    // })
  }
  async function signUp(data) {
    try {
      let res = await pickFixApi.signUp(data);
      console.log("sign up res", res);
      setToken(res);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }
  async function logIn(data) {
    try {
      let res = await pickFixApi.logIn(data);
      // console.log("App login  res", res)
      setToken(res);
      return { success: true, res: res };
    } catch (err) {
      return { success: false, err };
    }
  }

  function logOut() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <div> loading</div>;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, token, setCurrentUser, myLocation }}
      >
        <Navigation logOut={logOut} />
        <Routes signUp={signUp} logIn={logIn} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
