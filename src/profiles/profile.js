import React, { useEffect, useState, useContext } from "react";
import UserContext from "../userContext";
import capitalizeFirstLetter from "../common/capitalize";
import { Link } from "react-router-dom";
import pickFixApi from "../api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Card, Row, Col, Button } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);

const Profile = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [events, setEvents] = useState(null);
  const calEvents = [];
  useEffect(() => {
    loadEvents();
  }, [currentUser]);
  async function loadEvents() {
    console.log("in load events", currentUser.userType);
    let getEvents = await pickFixApi.getProjects(
      currentUser.id,
      currentUser.userType
    );
    console.log(getEvents);
    console.log("2in load events");

    if (getEvents.length > 0) {
      mountEventsToCalendar(getEvents);
      setEvents(calEvents);
    }
  }
  function mountEventsToCalendar(getEvents) {
    getEvents.map((event) => {
      const momentStartTime = moment(event.start_time, "YYYY-MM-DD hh:mm:ss a");
      const momentEndTime = moment(event.end_time, "YYYY-MM-DD hh:mm:ss a");
      const momentEvent = {
        start: momentStartTime._d,
        end: momentEndTime._d,
        title: `${event.title} - ${event.status}`,
        status: event.status,
      };
      calEvents.push(momentEvent);
    });
  }

  function handleClick(e) {
    console.log(e);
    if (e.status == "REQUESTED") {
      history.push("/requests");
    } else {
      history.push("/projects");
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card.Title className="d-flex mb-3 justify-content-center">
            Profile
          </Card.Title>
          <Card style={{ width: "100%" }}>
            <Card.Header>
              {Object.keys(currentUser).map((key, i) => {
                if (key === "id") {
                  return;
                }
                return (
                  <div key={`${i}`}>
                    <b>{capitalizeFirstLetter(key)}:</b> {currentUser[key]}
                  </div>
                );
              })}

              <div className="d-grid gap-2">
                <Button variant="primary" href="profile-form" size="lg">
                  Edit
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title className="d-flex  justify-content-center">
                Schedule
              </Card.Title>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleClick}
                style={{ height: 550 }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default Profile;
