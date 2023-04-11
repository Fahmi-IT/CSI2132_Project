import React, { useState } from "react";
import axios from "axios";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    address: "",
    SSN: "",
    full_name: "",
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
      await axios.post("http://localhost:3001/customers", customer);
      console.log("Customer added");
      setMessage("Account successfully created!");
    } catch (err) {
      setMessage("Oh! An error occured. Please try again.");
      console.log(err);
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form
        className="register-form"
        // method="POST"
        // action="http://localhost:3001/insert"
      >
        <label htmlFor="name">Full Name</label>
        <input
          // value={name}
          name="full_name"
          onChange={handleChange}
          id="name"
          placeholder="Full Name"
        />
        <label htmlFor="SSN">SSN/SIN</label>
        <input
          // value={SSN}
          onChange={handleChange}
          type="text"
          placeholder="SSN/SIN"
          id="SSN"
          name="SSN"
        />
        <label htmlFor="Address">Address</label>
        <input
          // value={address}
          onChange={handleChange}
          type="text"
          placeholder="address"
          id="address"
          name="address"
        />
        <button className="accountBtn" type="submit" onClick={handleClick}>
          Register
        </button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
