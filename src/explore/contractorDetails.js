import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import pickFixApi from "../api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RequestProjectForm from "./requestProjectForm";
import { Container, Card, Row, Col } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const localizer = momentLocalizer(moment);

const ContractorDetails = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    let getEvents = await pickFixApi.getProjects(id, "contractors");
    if (getEvents.length > 0) {
      mountEventsToCalendar(getEvents);
    }
  }
  function mountEventsToCalendar(getEvents) {
    getEvents.map((event) => {
      if (event.status !== "REQUESTED") {
        const momentStartTime = moment(
          event.start_time,
          "YYYY-MM-DD hh:mm:ss a"
        );
        const momentEndTime = moment(event.end_time, "YYYY-MM-DD hh:mm:ss a");
        const momentEvent = {
          start: momentStartTime._d,
          end: momentEndTime._d,
          title: event.title,
          project_id:"2"
        };
        console.log("moment event:", momentEvent);
        setEvents((data) => [...data, momentEvent]);
      }
    });
  }  
  if (events.length === 0) {
    return (
      <Container fluid>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card.Title className="d-flex mb-3 justify-content-center">
              Project Request Form
            </Card.Title>
            <Card className="p-2" style={{ width: "100%" }}>
              <Card.Header>
                <RequestProjectForm contractor_id={id} />
              </Card.Header>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card.Title className="d-flex mb-3 justify-content-center">
            Project Request Form
          </Card.Title>
          <Card className="p-2" style={{ width: "100%" }}>
            <Card.Header>
              <RequestProjectForm contractor_id={id} />
            </Card.Header>
            <Card.Title className="d-flex mb-3 justify-content-center">
              Schedule
            </Card.Title>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
             
            />
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default ContractorDetails;
