import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import capitalizeFirstLetter from "../common/capitalize";

const SignUpForm = ({ signUp }) => {
  const history = useHistory();

  const [signUpData, setSignUpData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    userType:"customers"  
  });
  async function handleSubmit(e) {
    e.preventDefault();

    let res = await signUp(signUpData);
    if (res.success) {
      console.log("success");
      history.push("/profile")
    }
  }
  async function handleChange(e){
    const { name, value } = e.target;    
    console.log(signUpData)
    setSignUpData((data) => ({ ...data, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit} >
      {Object.keys(signUpData).map((key, i) => {
        if (key !== "userType") {
          return (
            <div key={`${i}`}>
              <label>{capitalizeFirstLetter(key)}</label>
              <input
                id={`${key}`}
                name={`${key}`}
                value={signUpData[key]}
                  onChange={handleChange}
              />
            </div>
          );
        } else if (key === "userType") {
          return (
            <div key={`${i}`}>
              <label>User Type:</label>
              <select name="userType" id="userType" onChange={handleChange}>
                <option value="customers">Customer</option>
                <option value="contractors">Contractor</option>
              </select>
            </div>
          );
        }
      })}
      <button onSubmit={handleSubmit}>submit</button>
    </form>
  );
};

export default SignUpForm;
