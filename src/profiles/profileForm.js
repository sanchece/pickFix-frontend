import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import capitalizeFirstLetter from "../common/capitalize";
import pickFixApi from "../api";
import UserContext from "../userContext";


const ProfileForm = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);
   
  const [formData, setFormData] = useState({
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email:currentUser.email,
    password:""
  });
  async function handleSubmit(e) {
    e.preventDefault();    
  
    console.log("formData:",formData)
    console.log("curruserid:",currentUser.id)
    let res = await pickFixApi.updateUser(currentUser.id,formData);
    if (res) {
      console.log("success");
      setCurrentUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email:formData.email,
        id:currentUser.id
      })
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
