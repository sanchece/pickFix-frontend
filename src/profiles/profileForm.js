import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import capitalizeFirstLetter from "../common/capitalize";
import pickFixApi from "../api";
import UserContext from "../userContext";
import jwt from "jsonwebtoken";

const ProfileForm = () => {
  const history = useHistory();
  const { token, currentUser, setCurrentUser } = useContext(UserContext);
   
  const [formData, setFormData] = useState({
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email:currentUser.email,
    password:""
  });
  async function handleSubmit(e) {
    e.preventDefault();

    let { id, userType } = jwt.decode(token);
    let res = await pickFixApi.updateUser(currentUser.id,formData);
    if(!res){
      alert("wrong paswrod")
    }
    if (res) {
      console.log("success");
      setCurrentUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email:formData.email,
        id:currentUser.id,
        userType:userType
      })
      console.log("updated current user", currentUser)
     history.push("/profile")
    }
  }
  async function handleChange(e){
    const { name, value } = e.target;    
    console.log(formData)
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit} >
      Retype Password for double authentication
      {Object.keys(formData).map((key, i) => {
          return (
            <div key={`${i}`}>
              <label>{capitalizeFirstLetter(key)}</label>
              <input
                id={`${key}`}
                name={`${key}`}
                value={formData[key]}
                  onChange={handleChange}
              />
            </div>
          );
        
      })}
      <button onSubmit={handleSubmit}>submit</button>
    </form>
  );
};

export default ProfileForm;
