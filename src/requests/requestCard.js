import { Link } from "react-router-dom";
import React, { useContext } from "react";
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
import pickFixApi from "../api";
import UserContext from "../userContext";

const RequestCard = (props) => {
  const { currentUser } = useContext(UserContext);

  async function handleAccept() {
    const data = {
      id: props.project_id,
      title: props.title,
      description: props.description,
      status: "ACCEPTED",
      budget: props.budget,
      customer_id: props.customer_id,
      contractor_id: props.contractor_id,
      start_time: props.start_time,
      end_time: props.end_time,
    };
    const res = await pickFixApi.updateProject(props.project_id, data);
    console.log("accpeted", res);
  }
  async function handleDecline() {
    const data = {
      id: props.project_id,
      title: props.title,
      description: props.description,
      status: "DECLINED",
      budget: props.budget,
      customer_id: props.customer_id,
      contractor_id: props.contractor_id,
      start_time: props.start_time,
      end_time: props.end_time,
    };
    const res = await pickFixApi.updateProject(props.project_id, data);
    console.log("declined", res);
  }
  if (currentUser.userType == "contractors") {
    return (
      <Card bg="warning" border="none" className="mb-1">
        <Card.Body>
          <h6>{props.title}</h6>
          <div>Description: {props.description}</div>
          <div>Status: {props.status}</div>
          <div>Budget: {props.budget}</div>
          <div>Customer: {props.customer}</div>
          <div>Start Time: {props.start_time}</div>
          <div>End Time:{props.end_time}</div>
          <div className="d-grid gap-2">
          <Button variant="primary" href={`/projects/${props.project_id}`}>
            Chat
          </Button>

          <Button variant="success" href={handleAccept}>
            Accept
          </Button>

          <Button variant="danger" href={handleDecline}>
            Decline
          </Button>
        </div>

        </Card.Body>
      </Card>
    );
  }
  return (
    <Card bg="warning" border="none" className="mb-1 p-1">
      <Card.Body>
        <h5>{props.title}</h5>
        <div>Description: {props.description}</div>
        <div>Status: {props.status}</div>
        <div>Budget: {props.budget}</div>
        <div>Customer: {props.customer}</div>
        <div>Start Time: {props.start_time}</div>
        <div>End Time: {props.end_time}</div>

        <div className="d-grid gap-2">
          <Button variant="primary" href={`/projects/${props.project_id}`}>
            Chat
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RequestCard;
