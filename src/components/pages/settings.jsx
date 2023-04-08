import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App.js";
import "./settings.css";

function ViewProfile() {
  const { loggedIn, cus_emp } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [customerProp, setCustomerProp] = useState(null);
  const [employeeProp, setEmployeeProp] = useState(null);
  const [customer, setCustomer] = useState({
    SSN: user,
  });
  const [employee, setEmployee] = useState({
    SSN: user,
  });

  const [customerUpdate, setCustomerUpdate] = useState(null);
  const [employeeUpdate, setEmployeeUpdate] = useState(null);

  // console.log(cus_emp);

  useEffect(() => {
    if (!loggedIn) {
      window.location.replace("http://localhost:3000/signup");
    }
  }, [loggedIn]);

  const handleClickCus = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:3001/getCustomerSettings",
        customer
      );

      const customerProp = {
        full_name: response.data[0].full_name,
        SSN: response.data[0].SSN,
        address: response.data[0].address,
        date_of_registration: response.data[0].date_of_registration,
      };

      // console.log(response.data[0].SSN);

      setCustomerProp(customerProp);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmpClick = async (e) => {
    setEmployeeUpdate(true);
    setEmployeeProp(null);
  };

  const handleClickEmp = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response2 = await axios.post(
        "http://localhost:3001/getEmployeeSettings",
        employee
      );
      const employeeProp = {
        full_name: response2.data[0].full_name,
        SSN: response2.data[0].SSN,
        address: response2.data[0].address,
        position: response2.data[0].position,
        hotel_ID: response2.data[0].hotel_ID,
      };

      setEmployeeProp(employeeProp);
      setEmployeeUpdate(null);
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const full_name = formData.get("full_name");
    const address = formData.get("address");
    const position = formData.get("position");
    const employee2 = {
      SSN: user,
      full_name: full_name,
      address: address,
      position: position,
    };
    try {
      const response = await axios.put(
        "http://localhost:3001/updateEmployee",
        employee2
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {cus_emp ? (
        <div className="SecondTitle">
          <h3 className="infoTitle">Welcome Customer!</h3>
          Press to view or update your profile information <br></br>
          <button className="button btnStyle" onClick={handleClickCus}>
            View
          </button>
          <button className="button btnStyle" onClick={handleClickEmp}>
            Update
          </button>
          {customerProp && (
            <CustomerCard
              full_name={customerProp.full_name}
              SSN={customerProp.SSN}
              address={customerProp.address}
              date_of_registration={customerProp.date_of_registration}
            />
          )}
        </div>
      ) : (
        <div className="SecondTitle">
          <h3 className="infoTitle">Welcome Employee!</h3> Press to view or
          update your profile information <br></br>
          <button className="button btnStyle" onClick={handleClickEmp}>
            View
          </button>
          <button className="button btnStyle" onClick={handleEmpClick}>
            Update
          </button>
          {employeeUpdate && <EmployeeUpdateForm updateEmp={updateEmp} />}
          {employeeProp && (
            <EmployeeCard
              full_name={employeeProp.full_name}
              SSN={employeeProp.SSN}
              address={employeeProp.address}
              position={employeeProp.position}
              hotel_ID={employeeProp.hotel_ID}
            />
          )}
        </div>
      )}
    </>
  );
}

function EmployeeCard(props) {
  return (
    <div className="card2">
      <div className="card-content">
        <h1 className="card-header">{props.full_name}</h1>
        <p className="card-text">SSN: {props.SSN}</p>
        <p className="card-text">Position: {props.position}</p>
        <p className="card-text">Hotel ID: {props.hotel_ID}</p>
        <p className="card-text">Address: {props.address}</p>
      </div>
    </div>
  );
}

function CustomerCard(props) {
  return (
    <div className="card2">
      <div className="card-content">
        <h1 className="card-header">{props.full_name}</h1>
        <p className="card-text">SSN: {props.SSN}</p>
        <p className="card-text">Address: {props.address}</p>
        <p className="card-text">
          Date of registration {props.date_of_registration}
        </p>
      </div>
    </div>
  );
}

function EmployeeUpdateForm(props) {
  return (
    <form className="register-form" onSubmit={props.updateEmp}>
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        name="full_name"
        id="full_name"
        placeholder="full Name"
      />
      <label htmlFor="Position">Position</label>
      <input type="text" placeholder="position" id="position" name="position" />
      <label htmlFor="Address">Address</label>
      <input type="text" placeholder="address" id="address" name="address" />
      <button className="updateBtn" type="submit">
        Update user information
      </button>
    </form>
  );
}

export default ViewProfile;
