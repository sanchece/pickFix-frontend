import React, { useState, useContext, useEffect } from "react";
import capitalizeFirstLetter from "../common/capitalize";
import UserContext from "../userContext";
import pickFixApi from "../api";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

const RequestProjectForm = ({ contractor_id }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    budget: null,
    start_time: "",
    end_time: "",
    status: "REQUESTED",
    customer_id: currentUser.id,
    contractor_id: contractor_id,
  });
  const [startTime, handleStartTime] = useState(new Date());
  const [endTime, handleEndTime] = useState(new Date());
  useEffect(() => {
    console.log("requestProjectForm,projectData:", projectData);
  });

  async function handleChange(e) {
    const { id, value } = e.target;
    setProjectData((data) => ({ ...data, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    projectData.start_time = moment(startTime).format();
    projectData.end_time = moment(endTime).format();
    console.log(projectData);
    let res = await pickFixApi.addProject(projectData);
    console.log("res in requestProjectForm: ", res);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Project Request Form
        {Object.keys(projectData).map((key, i) => {
          if (i < 5) {
            if (key == "start_time" ) {
              return (
                <div>
                  <label>{capitalizeFirstLetter(key)}: </label>
                  <DateTimePicker
                    id={`${key}`}
                    name={`${key}`}
                    onChange={handleStartTime}
                    value={startTime}
                  />
                </div>
              );
            }
            else if(key==="end_time"){
              return (
                <div>
                  <label>{capitalizeFirstLetter(key)}: </label>
                  <DateTimePicker
                    id={`${key}`}
                    name={`${key}`}
                    onChange={handleEndTime}
                    value={endTime}
                  />
                </div>
              );
            }
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
