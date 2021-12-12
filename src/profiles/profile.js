import React, { useEffect, useState, useContext } from "react";
import UserContext from "../userContext";
import capitalizeFirstLetter from "../common/capitalize";
import { Link } from "react-router-dom";
import pickFixApi from "../api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [events, setEvents] = useState(null);
  const calEvents = [];
  useEffect(() => {
    loadEvents()
  }, [currentUser]);
  async function loadEvents() {
    console.log("in load events", currentUser.userType)
    let getEvents = await pickFixApi.getProjects(currentUser.id, currentUser.userType );
   console.log(getEvents);
    console.log("2in load events")

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
      };
      calEvents.push(momentEvent);
    });
  }
  return (
    <div>
      <div>
        gps:
        <gps />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      {Object.keys(currentUser).map((key, i) => {
        if (key === "id") {
          return;
        }
        return (
          <div key={`${i}`}>
            {capitalizeFirstLetter(key)}:{currentUser[key]}
          </div>
        );
      })}
      <Link to="profile-form">Edit</Link>
    </div>
  );
};

export default Profile;
