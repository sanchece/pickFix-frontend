import React, { useContext } from "react";
import UserContext from "../userContext";
import { NavLink } from "react-router-dom";

const Navbar = ({ logOut }) => {
  const { currentUser } = useContext(UserContext);
  function loggedIn() {
    return (
      <ul>
        <h3>pickFix</h3>
        <li>
          <NavLink to="/explore">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={logOut}>Log Out</NavLink>
        </li>
      </ul>
    );
  }
  function loggedOut() {
    return (
      <ul>
        <h3>pickFix</h3>
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      {currentUser ? loggedIn() : loggedOut()}
    </nav>
  );
};

export default Navbar;
