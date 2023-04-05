import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {
  const [customer, setCustomer] = useState({
    SSN: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/signIn",
        customer
      );
      const count = response.data[0]["COUNT(full_name)"];
      if (count === 0) {
        setMessage("Account doesn't exist!");
      } else {
        setMessage("Account exists! You're signed in");
      }
      console.log("Customer's SSN checked in Database");
    } catch (err) {
      setMessage("Oh! An error occured. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form
        className="login-form"
        // method="POST"
        // action="http://localhost:3001/check"
      >
        <label htmlFor="SSN">SSN/SIN</label>
        <input
          // value={SSN}
          onChange={handleChange}
          type="text"
          placeholder="SSN/SIN"
          id="SSN"
          name="SSN"
        />
        <button type="submit" onClick={handleClick}>
          Log In
        </button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
