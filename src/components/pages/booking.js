import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App.js";

const Booking = () => {
  // Check if user is logged in
  const { loggedIn } = useContext(UserContext);
  useEffect(() => {
    if (!loggedIn) {
      window.location.replace("http://localhost:3000/signup");
    }
  }, [loggedIn]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "Right",
        alignItems: "Right",
        height: "100vh",
      }}
    >
      <h1>Bookings</h1>
    </div>
  );
};

export default Booking;
