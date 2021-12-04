import React, { useContext } from "react";
import UserContext from "../userContext";
import capitalizeFirstLetter from "../common/capitalize";
import { Link } from "react-router-dom";

 const Profile = () => {
  const { currentUser } = useContext(UserContext);
  console.log("curruser1",currentUser);
  return (
    <div>
      {Object.keys(currentUser).map((key, i) => {
        if (key === "id") {
          return;
        }
        return (
          <div key={`${i}`}>
            {capitalizeFirstLetter(key)}: 
            {currentUser[key]}
          </div>
        );
      })}
      <Link to="profile-form">Edit</Link>
    </div>
  );
    
};

export default Profile;
