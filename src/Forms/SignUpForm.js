import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import capitalizeFirstLetter from "../common/capitalize";
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
const SignUpForm = ({ signUp }) => {
  const history = useHistory();

  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    userType: "customers",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signUp(signUpData);
    if (res.success) {
      console.log("success");
      history.push("/profile");
    } else {
      alert("This email already has an account");
    }
  }
  async function handleChange(e) {
    const { name, value } = e.target;
    if (value === "contractors") {
      console.log("selected contractors");
      setSignUpData((data) => ({
        ...data,
        name: "",
      }));
    } else if (value === "customers") {
      delete signUpData.name;
    }
    console.log(signUpData);
    setSignUpData((data) => ({ ...data, [name]: value }));
  }

  return (
    <Container style={{ margin: "100px 0px 0px 0px" }} fluid>
      <Row>
        <Col lg={4}></Col>
        <Col lg={4}>
          <Card className="d-flex align-items-center justify-content-center">
            <Card.Body>
              <Card.Title className="d-flex mb-3 justify-content-center">
                Sign Up
              </Card.Title>
              <Card.Text>
                <form onSubmit={handleSubmit}>
                  {Object.keys(signUpData).map((key, i) => {
                    if (key !== "userType" && key !=="password") {
                      return (
                        <div key={`${i}`}>
                          <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              {capitalizeFirstLetter(key)}
                            </InputGroup.Text>
                            <FormControl
                              placeholder={`Enter ${capitalizeFirstLetter(
                                key
                              )} Here`}
                              name={`${key}`}
                              value={signUpData[key]}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </div>
                      );
                    } else if (key === "userType") {
                      return (
                        <div key={`${i}`}>
                          <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              {capitalizeFirstLetter(key)}
                            </InputGroup.Text>
                            <Form.Select
                              name="userType"
                              id="userType"
                              onChange={handleChange}
                            >
                              <option value="customers">Customer</option>
                              <option value="contractors">Contractor</option>
                            </Form.Select>
                          </InputGroup>
                        </div>
                      );
                    }
                    else if (key === "password") {
                      return (
                        <div key={`${i}`}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">
                            {capitalizeFirstLetter(key)}
                          </InputGroup.Text>
                          <FormControl
                            placeholder={`Enter ${capitalizeFirstLetter(
                              key
                            )} Here`}
                            name={`${key}`}
                            value={signUpData[key]}
                            onChange={handleChange}
                            type="password"
                          />
                        </InputGroup>
                      </div>
                      );}
                  })}
                  <div className="d-grid gap-2">
                    <Button onClick={handleSubmit}>Sign Up</Button>
                  </div>
                </form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}></Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
