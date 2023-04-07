import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App.js";
import "./settings.css";

function ViewProfile() {
  const [customerProp, setCustomerProp] = useState(null);
  const [employeeProp, setEmployeeProp] = useState(null);
  const { loggedIn, cus_emp } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(cus_emp);

  const [customer, setCustomer] = useState({
    SSN: user,
  });
  const [employee, setEmployee] = useState({
    SSN: user,
  });
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
        "http://localhost:8080/getCustomerSettings",
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

  const handleClickEmp = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response2 = await axios.post(
        "http://localhost:8080/getEmployeeSettings",
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <h3 className="infoTitle">My Profile Settings</h3> */}
      {cus_emp ? (
        <div className="SecondTitle">
          <h3 className="infoTitle">Welcome customer!</h3>
          Press the button below to unlock your information. <br></br>
          <button className="button btnStyle" onClick={handleClickCus}>
            Press me
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
          <h3 className="infoTitle">Welcome Employee!</h3>Press the button below
          to unlock your information.<br></br>
          <button className="button btnStyle" onClick={handleClickEmp}>
            Press me
          </button>
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

export default ViewProfile;
