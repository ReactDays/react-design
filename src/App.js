import React, { useState, useEffect } from 'react';
// var data = require("./design.json");

function App(room, bookings) {
  const [design, setDesign] = useState({
      today: [],
      thisWeek: [],
      nextWeek: []
  });

  useEffect(() => {
      const today = new Date().toDateString();
      const thisWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toDateString();
      const nextWeek = new Date(new Date().setDate(new Date().getDate() + 14)).toDateString();

      const filteredBookings = bookings.filter(booking => {
          if (booking.room !== room) return false;

          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          if (startDate <= today && today <= endDate) return true;
          if (startDate <= thisWeek && thisWeek <= endDate) return true;
          if (startDate <= nextWeek && nextWeek <= endDate) return true;

          return false;
      });

      const todayBookings = filteredBookings.filter(booking => {
          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          return startDate <= today && today <= endDate;
      });
      const thisWeekBookings = filteredBookings.filter(booking => {
          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          return startDate <= thisWeek && thisWeek <= endDate;
      });
      const nextWeekBookings = filteredBookings.filter(booking => {
          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          return startDate <= nextWeek && nextWeek <= endDate;
      });

      setDesign({
          today: todayBookings,
          thisWeek: thisWeekBookings,
          nextWeek: nextWeekBookings
      });
  }, [room, bookings]);

  return design;
}





export default App;
