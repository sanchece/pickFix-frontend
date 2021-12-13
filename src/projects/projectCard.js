import { Link } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../userContext";
import { Card, Container, Row, Col, Button, Stack,  InputGroup, Form, FormControl } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const ProjectCard=(props)=>{
  const { currentUser } = useContext(UserContext);


return(
    <Card bg="success" className="mb-1 p-1">
                        <Card.Body>
                        <h5>{props.title}</h5>
    <div>Description: {props.description}</div>
    <div>Status: {props.status}</div>
    <div>Budget: {props.budget}</div>
    <div>Customer: {props.customer}</div>
    <div>Contractor: {props.name}</div>
    <div>Start Time: {props.start_time}</div>
    <div>End Time: {props.end_time}</div>

    <div className="d-grid gap-2">
            <Button variant="primary" href={`/projects/${props.project_id}`} >
              Chat
            </Button>
          </div>
</Card.Body>

  </Card>  
)

}

export default ProjectCard;