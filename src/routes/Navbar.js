import React, { useContext } from "react";
import UserContext from "../userContext";
import { Navbar, Nav, Container } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = ({ logOut }) => {
  const { currentUser } = useContext(UserContext);
  function loggedIn() {
    if (currentUser.userType == "customers") {
      return (
        <Container fluid>
          <Navbar.Brand href="/">pickFix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/explore">Explore</Nav.Link>
              <Nav.Link href="/requests">Requests</Nav.Link>
              <Nav.Link href="/projects">Projects</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="me-auto" onClick={logOut}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      );
    } else {
      return (
        <Container fluid>
          <Navbar.Brand href="/">pickFix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/requests">Requests</Nav.Link>
              <Nav.Link href="/projects">Projects</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="me-auto" onClick={logOut}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      );
    }
  }
  function loggedOut() {
    return (
      <Container fluid>
        <Navbar.Brand href="/">pickFix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me">
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {currentUser ? loggedIn() : loggedOut()}
    </Navbar>
  );
};

export default Navigation;
