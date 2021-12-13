import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const ContractorCard = (props) => {
  return (
    <Card className="m-3">
      <Card.Body className="m-3">
        <div>
          <b>Business Name: </b> {props.name}
        </div>
        <div>
          <b>Firstname:</b>
          {props.firstname}
        </div>
        <div>
          <b>Lastname: </b>
          {props.lastname}
        </div>
        <div>
          <b>Email: </b>
          {props.email}
        </div>

        <div className="d-grid gap-2">
          <Button variant="success" href={`/explore/${props.id}`} size="lg">
            Request Service
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContractorCard;
