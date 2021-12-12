import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const LogInForm = ({ logIn }) => {
  const history = useHistory();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
    userType: "customers",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    let res = await logIn(logInData);
    if (res.success) {
      history.push("/profile")
    }
    else{
      alert("Incorrect Email/Password/UserType")
    }
  }
  async function handleChange(e){
    const { name, value } = e.target;    
    console.log(logInData)
    setLogInData((data) => ({ ...data, [name]: value }));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <form onSubmit={handleSubmit} >
      {Object.keys(logInData).map((key, i) => {
        if (key !== "userType") {
          return (
            <div key={`${i}`}>
              <label>{capitalizeFirstLetter(key)}</label>
              <input
                name={`${key}`}
                value={logInData[key]}
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
        return <div></div>
      })}

      <button onSubmit={handleSubmit}> submit</button>
    </form>
  );
};

export default LogInForm;
