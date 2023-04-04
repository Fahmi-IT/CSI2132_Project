import React, { useState } from "react";

export const Register = (props) => {
  const [SSN, setSSN] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form
        className="register-form"
        method="POST"
        action="http://localhost:3001/insert"
      >
        <label htmlFor="name">Full Name</label>
        <input
          // value={name}
          name="full_name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Full Name"
        />
        <label htmlFor="SSN">SSN/SIN</label>
        <input
          // value={SSN}
          onChange={(e) => setSSN(e.target.value)}
          type="text"
          placeholder="SSN/SIN"
          id="SSN"
          name="SSN"
        />
        <label htmlFor="Address">Address</label>
        <input
          // value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="address"
          id="address"
          name="address"
        />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
