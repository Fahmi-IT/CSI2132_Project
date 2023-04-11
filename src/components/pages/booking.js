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

  const [rentBool, setRentBool] = useState(null);
  const handleClick = async (e) => {
    setRentBool(true);
  };
  const [rentedBookings, setRentedBookings] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    if (!loggedIn) {
      window.location.replace("http://localhost:3000/signup");
    }
  }, [loggedIn]);

  useEffect(() => {
    const url = cus_emp
      ? "http://localhost:3001/getCusBookings"
      : "http://localhost:3001/getBookings";
    const method = cus_emp ? axios.post : axios.get;
    method(url, customer)
      .then((response) => {
        setBookings(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cus_emp, customer]);

  const rentBooking = async (booking) => {
    const dateStart = booking.start_date;
    const dateObjS = new Date(dateStart);
    const yearS = dateObjS.getFullYear();
    const monthS = (dateObjS.getMonth() + 1).toString().padStart(2, "0");
    const dayS = dateObjS.getDate().toString().padStart(2, "0");
    const formattedStart = `${yearS}-${monthS}-${dayS}`;

    const dateEnd = booking.start_date;
    const dateObjE = new Date(dateEnd);
    const yearE = dateObjE.getFullYear();
    const monthE = (dateObjE.getMonth() + 1).toString().padStart(2, "0");
    const dayE = dateObjE.getDate().toString().padStart(2, "0");
    const formattedEnd = `${yearE}-${monthE}-${dayE}`;

    const rent = {
      booking_ID: booking.booking_ID,
      check_in_date: formattedStart,
      check_out_date: formattedEnd,
      room_number: booking.room_number,
      customer_ID: booking.customer_ID,
    };
    // console.log(rent.check_in_date);
    try {
      const response = await axios.post(
        "http://localhost:3001/insertRenting",
        rent
      );
      console.log(response.data);
      setRentedBookings([...rentedBookings, booking.booking_ID]);
    } catch (err) {
      console.log(err);
    }
  };

  const createRent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const room_number = formData.get("room_number");
    const check_in_date = formData.get("check_in_date");
    const check_out_date = formData.get("check_out_date");
    const customer_ID = formData.get("customer_ID");

    const rent = {
      booking_ID: "000",
      check_in_date: check_in_date,
      check_out_date: check_out_date,
      room_number: room_number,
      customer_ID: customer_ID,
    };

    // IF BOOKING ID = 000 then renting was made directly
    // had to create a null user and a null booking Id with ID 000

    try {
      const response = await axios.post(
        "http://localhost:3001/insertRenting",
        rent
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="bookings-section">
      <h2 class="bookings-header">
        {cus_emp ? "All of your bookings !" : "All customers' bookings"}
      </h2>
      <ul class="bookings-list">
        {bookings.map((booking) => {
          if (booking.booking_ID === "000") {
            return null; // Skip this booking
          }

          // console.log("look here" + booking.start_date);
          const startDateObj = new Date(booking.start_date);
          const endDateObj = new Date(booking.end_date);

          const startYear = startDateObj.getFullYear();
          const startMonth = startDateObj.getMonth() + 1;
          const startDate = startDateObj.getDate();

          const endYear = endDateObj.getFullYear();
          const endMonth = endDateObj.getMonth() + 1;
          const endDate = endDateObj.getDate();

          return (
            <li key={booking.booking_ID} className="booking-item">
              <p className="booking-id">Booking ID: {booking.booking_ID}</p>
              {cus_emp ? null : (
                <p className="customer_ID">
                  Customer_ID: {booking.customer_ID}
                </p>
              )}

              <p className="room-number">Room number: {booking.room_number}</p>
              <p className="booking-dates">
                Booking Start Date: {startYear}-{startMonth}-{startDate} |
                Booking End Date: {endYear}-{endMonth}-{endDate}
              </p>
              {cus_emp ? null : rentedBookings.includes(
                  booking.booking_ID
                ) ? null : (
                <button
                  className="rentButton"
                  onClick={() => rentBooking(booking)}
                >
                  Check in customer
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {cus_emp ? null : (
        <div>
          <h3>Create a Rent</h3>
          <form className="rentingForm" onSubmit={createRent}>
            <label htmlFor="room_numbe">Room Number</label>
            <input
              type="text"
              name="room_number"
              id="room_number"
              placeholder="room_number"
            />
            <label htmlFor="Check_in_date">Check In Date</label>
            <input
              type="date"
              placeholder="check_in_date"
              id="check_in_dates"
              name="check_in_date"
            />
            <label htmlFor="Check_out_date">Check Out Date</label>
            <input
              type="date"
              placeholder="check_out_date"
              id="check_out_dates"
              name="check_out_date"
            />
            <label htmlFor="customer_ID">Customer Id</label>
            <input
              type="text"
              name="customer_ID"
              id="customer_ID"
              placeholder="customer_ID"
            />
            <button className="rentButton" type="submit">
              Make a renting
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Booking;