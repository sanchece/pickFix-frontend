import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import capitalizeFirstLetter from "../common/capitalize";
import pickFixApi from "../api";
import UserContext from "../userContext";
import jwt from "jsonwebtoken";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Stack,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const ProfileForm = () => {
  const history = useHistory();
  const { token, currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();

    let { id, userType } = jwt.decode(token);
    let res = await pickFixApi.updateUser(currentUser.id, formData);
    if (!res) {
      alert("wrong password");
    }
    if (res) {
      console.log("success");
      setCurrentUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        id: currentUser.id,
        userType: userType,
      });
      console.log("updated current user", currentUser);
      history.push("/profile");
    }
  }
  async function handleChange(e) {
    const { name, value } = e.target;
    console.log(formData);
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <Container className="d-flex  justify-content-center">
      <Row style={{ top: "20%", position: "absolute" }}>
        <Col>
        <Card.Title className="d-flex mb-3 justify-content-center">
                Update Profile
              </Card.Title>
          <Card>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              
              {Object.keys(formData).map((key, i) => {
                return (
                  <div key={`${i}`}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        {capitalizeFirstLetter(key)}
                      </InputGroup.Text>
                      <FormControl
                        placeholder={`Enter ${capitalizeFirstLetter(key)} Here`}
                        id={`${key}`}
                        name={`${key}`}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </div>
                );
              })}
            
              <div className="d-grid gap-2">
              Retype Password for double authentication
<Button  onClick={handleSubmit}>Update</Button>
</div>
            </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileForm;
