import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import capitalizeFirstLetter from "../common/capitalize";
import UserContext from "../userContext";
import pickFixApi from "../api";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const RequestProjectForm = ({ contractor_id }) => {
  const history = useHistory();

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
    history.push("/requests");
  }
  return (
    <div>
      <Form>
        {Object.keys(projectData).map((key, i) => {
          if (i < 5) {
            if (key == "start_time") {
              return (
                <div key={`${i}`}>
                  <InputGroup className="mb-1">
                    <InputGroup.Text id="basic-addon1">
                      {capitalizeFirstLetter(key)}:
                    </InputGroup.Text>
                    <DateTimePicker
                      id={`${key}`}
                      name={`${key}`}
                      onChange={handleStartTime}
                      value={startTime}
                    />
                  </InputGroup>
                </div>
              );
            } else if (key === "end_time") {
              return (
                <div key={`${i}`}>
                  <InputGroup className="mb-1">
                    <InputGroup.Text id="basic-addon1">
                      {capitalizeFirstLetter(key)}:
                    </InputGroup.Text>
                    <DateTimePicker
                      id={`${key}`}
                      name={`${key}`}
                      onChange={handleEndTime}
                      value={endTime}
                    />
                  </InputGroup>
                </div>
              );
            }
            return (
              <div key={`${i}`}>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">
                    {capitalizeFirstLetter(key)}:
                  </InputGroup.Text>
                  <FormControl
                    placeholder={`Enter ${capitalizeFirstLetter(key)} Here`}
                    id={`${key}`}
                    name={`${key}`}
                    value={projectData[key]}
                    onChange={handleChange}
                  />
                </InputGroup>
              </div>
            );
          }
        })}

        <div className="d-grid gap-2">
          <Button variant="success" onClick={handleSubmit}>
            Request Service
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default RequestProjectForm;
