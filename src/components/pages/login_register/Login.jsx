import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {
  // const [email, setEmail] = useState("");
  // const [SSN, setSSN] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(email);
  // };

  const [customer, setCustomer] = useState({
    SSN: "",
  });

  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/signIn", customer);
      console.log("Customer's SSN checked in Database");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
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
