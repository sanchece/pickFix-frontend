import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import pickFixApi from "../api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const ContractorDetails = () => {
  const { id } = useParams();
  // const calEvents = [];
  const [events, setEvents] = useState([]);
  useEffect(() => {
    loadEvents();
    
  }, []);

  async function loadEvents() {
    let getEvents = await pickFixApi.getEvents(id, "contractors");
    if (getEvents.length > 0) {
      mountEventsToCalendar(getEvents);
      // setEvents(calEvents);  ////***** why works here

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

      console.log("moment event:", momentEvent)
      setEvents((data)=>(
        [...data, momentEvent]
      ))



      // calEvents.push(momentEvent);
    });

  }
  if (events.length===0) {
    return <div> no events</div>;
  }
  return (
    <div>
      <div>
        events:
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default ContractorDetails;
