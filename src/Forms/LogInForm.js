import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Stack,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
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
      history.push("/profile");
    } else {
      alert("Incorrect Email/Password/UserType");
    }
  }
  async function handleChange(e) {
    const { name, value } = e.target;
    console.log(logInData);
    setLogInData((data) => ({ ...data, [name]: value }));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Container style={{ margin: "100px 0px 0px 0px" }} fluid>
      <Row>
        <Col lg={4}></Col>
        <Col lg={4}>
          <Card
            className="d-flex align-items-center justify-content-center"
            border=""
            // style={{ padding: "10px 0px 30px 0px", width: "25em" }}
          >
            <Card.Body>
              <Card.Title className="d-flex mb-3 justify-content-center">
                Log In
              </Card.Title>
                <Form onSubmit={handleSubmit}>
                  {Object.keys(logInData).map((key, i) => {
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
                              value={logInData[key]}
                              onChange={handleChange}
                            />
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
                            value={logInData[key]}
                            onChange={handleChange}
                            type="password"
                          />
                        </InputGroup>
                      </div>
                      );}
                    else if (key === "userType") {
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
                    return <div></div>;
                  })}
                  <div className="d-grid gap-2">
                    <Button onClick={handleSubmit}>Log In</Button>
                  </div>
                </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}></Col>
      </Row>
    </Container>
  );
};

export default LogInForm;
