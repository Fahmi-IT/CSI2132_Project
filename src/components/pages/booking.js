import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App.js";
import "./bookings.css";

const Booking = () => {
  const { loggedIn, cus_emp } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [customer, setCustomer] = useState({
    SSN: user,
  });
  const [employee, setEmployee] = useState({
    SSN: user,
  });
  // Check if user is logged in
  useEffect(() => {
    if (!loggedIn) {
      window.location.replace("http://localhost:3000/signup");
    }
  }, [loggedIn]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/getCusBookings", customer)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div class="bookings-section">
      <h2 class="bookings-header">All of your bookings !</h2>
      <ul class="bookings-list">
        {bookings.map((booking) => {
          const startDateObj = new Date(booking.start_date);
          const endDateObj = new Date(booking.end_date);

          const startYear = startDateObj.getFullYear();
          const startMonth = startDateObj.getMonth() + 1;
          const startDate = startDateObj.getDate();

          const endYear = endDateObj.getFullYear();
          const endMonth = endDateObj.getMonth() + 1;
          const endDate = endDateObj.getDate();

          return (
            <li key={booking.booking_ID} class="booking-item">
              <p class="booking-id">Booking ID: {booking.booking_ID}</p>
              <p class="room-number">Room number: {booking.room_number}</p>
              <p class="booking-dates">
                Booking Start Date: {startYear}-{startMonth}-{startDate} |
                Booking End Date: {endYear}-{endMonth}-{endDate}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Booking;
