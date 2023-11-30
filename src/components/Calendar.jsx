import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Calendar = () => {
  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    
    const fetchTrainings = async () => {
      try {
        const response = await fetch("https://traineeapp.azurewebsites.net/gettrainings");
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  const events = trainings.map((training) => ({
    title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
    start: new Date(training.date),
    end: moment(training.date)
      .add(training.duration, "minutes")
      .toDate(),
  }));

  return (
    <div style={{ height: "500px" }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={["month", "week", "day"]}
        step={60}
        defaultDate={new Date()}
      />
    </div>
  );
};

export default Calendar;
