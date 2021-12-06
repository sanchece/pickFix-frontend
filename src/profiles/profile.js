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
  }, []);
  async function loadEvents() {
    let getEvents = await pickFixApi.getEvents(currentUser.id, currentUser.userType );
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
        title: event.title,
      };
      calEvents.push(momentEvent);
    });
  }

  return (
    <div>
      <div>
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
