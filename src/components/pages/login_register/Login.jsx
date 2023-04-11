import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../App.js";

export const Login = (props) => {
  const { user, signInEmp, signInCus, signOut, loggedIn, cus_emp } =
    useContext(UserContext);

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
        "http://localhost:3001/signIn",
        customer
      );
      const count = response.data[0]["COUNT(full_name)"];

      const secondResponse = await axios.post(
        "http://localhost:3001/signInEmp",
        customer
      );
      const secondCount = secondResponse.data[0]["COUNT(full_name)"];

      if (count === 0 && secondCount === 0) {
        setMessage("Account doesn't exist!");
      } else if (count === 0 && secondCount !== 0) {
        setMessage("Account exists! Employee signed in.");
        signInEmp(customer.SSN);
      } else {
        setMessage("Account exists! Customer signed in.");
        signInCus(customer.SSN);
        console.log(user);
        console.log(cus_emp);
        console.log(loggedIn);
        // console.log("Customer's SSN is " + customer.SSN);
        // console.log(user);
      }

      console.log("User's SSN checked in Database");
    } catch (err) {
      setMessage("Oh! An error occured. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form className="login-form">
        <label htmlFor="SSN">SSN/SIN</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="SSN/SIN"
          id="SSN"
          name="SSN"
        />
        <button className="accountBtn" type="submit" onClick={handleClick}>
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
