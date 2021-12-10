import React, { useState, useContext, useEffect } from "react";
import capitalizeFirstLetter from "../common/capitalize";
import UserContext from "../userContext";
import pickFixApi from "../api";

const RequestProjectForm = ({contractor_id}) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    budget: null,
    start_time:"",
    end_time:"",
    status: "REQUESTED",
    customer_id: currentUser.id,
    contractor_id: contractor_id
  });



  

  useEffect(() => {
    console.log("requestProjectForm,projectData:", projectData);
  });
  async function handleChange(e) {
    const { name, value } = e.target;
    setProjectData((data) => ({ ...data, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(projectData);
    let res =await pickFixApi.addProject(projectData);
    console.log("res in requestProjectForm: ", res)
    // window.location.reload(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Project Request Form
        {Object.keys(projectData).map((key, i) => {
          if (i < 5) {
            return (
              <div key={`${i}`}>
                <label>{capitalizeFirstLetter(key)}: </label>
                <input
                  id={`${key}`}
                  name={`${key}`}
                  value={projectData[key]}
                  onChange={handleChange}
                />
              </div>
            );
          }
        })}

        <button> Submit</button>
      </form>
    </div>
  );
};
export default RequestProjectForm;
