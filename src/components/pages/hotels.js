import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./hotels.css";
import banffimg from "./locationImg/loc1.jpg";
import torontoimg from "./locationImg/loc2.jpg";
import montrealimg from "./locationImg/loc3.jpg";
import quebecCityimg from "./locationImg/loc4.jpg";
import ottawaimg from "./locationImg/loc5.jpg";
import halifaximg from "./locationImg/loc6.jpg";
import edmontonimg from "./locationImg/loc7.jpg";
import saskatoonimg from "./locationImg/loc8.jpg";
import niagaraFallsimg from "./locationImg/loc9.jpg";
import { UserContext } from "../../App.js";

function Hotels() {
  const { loggedIn, cus_emp } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [employeeProp, setEmployeeProp] = useState({
    SSN: user,
  });
  const [hotels, setHotels] = useState([]);
  const [canViewHotels, setCanViewHotels] = useState("");
  const [canUpdate, setCanUpdate] = useState("");
  const [isManager, setManager] = useState("");
  const [canDeleteCustomer, setDeleteCus] = useState("");
  const [canDeleteEmployee, setDeleteEmp] = useState("");

  useEffect(() => {
    if (!cus_emp && loggedIn) {
      handleClickEmp();
    }
  }, [loggedIn, cus_emp]);

  const click = async (e) => {
    setCanUpdate(true);
    setCanViewHotels(false);
    setDeleteCus(false);
    setDeleteEmp(false);
  };

  const click2 = async (e) => {
    setDeleteCus(true);
    setDeleteEmp(false);
    setCanUpdate(false);
    setCanViewHotels(false);
  };

  const click3 = async (e) => {
    setDeleteEmp(true);
    setDeleteCus(false);
    setCanUpdate(false);
    setCanViewHotels(false);
  };

  const handleClickEmp = async () => {
    try {
      const response2 = await axios.post(
        "http://localhost:3001/getEmployeeSettings",
        employeeProp
      );
      const information = {
        full_name: response2.data[0].full_name,
        SSN: response2.data[0].SSN,
        address: response2.data[0].address,
        position: response2.data[0].position,
        hotel_ID: response2.data[0].hotel_ID,
      };

      if (information.position.toLowerCase().includes("manager")) {
        setManager(true);
      }

      setEmployeeProp(information);
    } catch (err) {
      console.log(err);
    }
  };

  // const getAllEmployees = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/employee");
  //     setHotels(response.data);
  //     setCanViewHotels(true);
  //     setCanUpdate(false);
  //     setDeleteCus(false);
  //     setDeleteEmp(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getAllCustomers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/getCustomers");
  //     setHotels(response.data);
  //     setCanViewHotels(true);
  //     setCanUpdate(false);
  //     setDeleteCus(false);
  //     setDeleteEmp(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getAllHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hotel", user);
      setHotels(response.data);
      setCanViewHotels(true);
      setCanUpdate(false);
      setDeleteCus(false);
      setDeleteEmp(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateHotel = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const address = formData.get("address");
    const star_rating = formData.get("star_rating");
    const phone_number = formData.get("phone_number");
    const contact_email = formData.get("contact_email");
    const manager = formData.get("manager");
    const number_of_rooms = formData.get("number_of_rooms");
    const newHotel = {
      hotel_ID: employeeProp.hotel_ID,
      address: address,
      star_rating: star_rating,
      phone_number: phone_number,
      contact_email: contact_email,
      manager: manager,
      number_of_rooms: number_of_rooms,
    };

    try {
      const response = await axios.put(
        "http://localhost:3001/updateHotel",
        newHotel
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCus = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const customer_ID = formData.get("customer_ID");
    const customer = {
      customer_ID: customer_ID,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/deleteCustomer",
        customer
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const employee_ID = formData.get("employee_ID");
    const employee = {
      employee_ID: employee_ID,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/deleteEmployee",
        employee
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  function DeleteCustomer() {
    return (
      <form className="update-hotel-form" onSubmit={deleteCus}>
        <h3>Delete Customer</h3>

        <label htmlFor="Address">Customer ID</label>
        <input
          type="text"
          placeholder="customer_ID"
          id="customer_ID"
          name="customer_ID"
        />
        <button className="updateBtn" type="submit">
          Delete Customer
        </button>
      </form>
    );
  }

  function DeleteEmployee() {
    return (
      <form className="update-hotel-form" onSubmit={deleteEmp}>
        <h3>Delete Employee</h3>

        <label htmlFor="Address">Employee ID</label>
        <input
          type="text"
          placeholder="employee_ID"
          id="employee_ID"
          name="employee_ID"
        />
        <button className="updateBtn" type="submit">
          Delete Employee
        </button>
      </form>
    );
  }

  function UpdateHotelForm() {
    return (
      <form className="update-hotel-form" onSubmit={updateHotel}>
        <h3>
          Changing the information for hotel with ID : {employeeProp.hotel_ID}
        </h3>

        <label htmlFor="Address">Address</label>
        <input type="text" placeholder="address" id="address" name="address" />
        <label htmlFor="star">Star Rating</label>
        <input
          type="number"
          placeholder="star_rating"
          step="0.1"
          min="0"
          max="5"
          id="star_rating"
          name="star_rating"
        />
        <label htmlFor="email">Contact Email</label>
        <input
          type="text"
          placeholder="contact_email"
          id="contact_email"
          name="contact_email"
        />
        <label htmlFor="star">Number of Rooms</label>
        <input
          type="number"
          placeholder="number_of_rooms"
          id="number_of_rooms"
          name="number_of_rooms"
        />
        <label htmlFor="Phone Number">Phone Number</label>
        <input
          type="text"
          placeholder="phone_number"
          id="phone_number"
          name="phone_number"
        />
        <label htmlFor="Manager">Manager</label>
        <input type="text" placeholder="manager" id="manager" name="manager" />
        <button className="updateBtn" type="submit">
          Update user information
        </button>
      </form>
    );
  }

  return (
    <>
      {cus_emp === true || loggedIn === false ? (
        <>
          <h3 className="infoTitle">Our wonderful locations</h3>
          <OurWonderfulLocations />
        </>
      ) : (
        <>
          <h3 className="infoTitle">All hotels</h3>
          <button className="empButton" onClick={getAllHotels}>
            View all hotels
          </button>

          {isManager && (
            <>
              <button className="empButton detailButton" onClick={click}>
                Update hotel
              </button>
              <button className="empButton detailButton" onClick={click3}>
                Delete Employee
              </button>
            </>
          )}
          <button className="empButton detailButton" onClick={click2}>
            Delete Customer
          </button>
          {canDeleteCustomer && (
            <>
              <DeleteCustomer />
              {/* <ul className="employee-list">
                {employee.map((hotel) => (
                  <HotelListItem key={hotel.hotel_ID} hotel={hotel} />
                ))}
              </ul> */}
            </>
          )}

          {canDeleteEmployee && <DeleteEmployee />}
          {canUpdate && <UpdateHotelForm />}
          {canViewHotels && (
            <ul className="hotels-list">
              {hotels.map((hotel) => (
                <HotelListItem key={hotel.hotel_ID} hotel={hotel} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

function HotelListItem({ hotel }) {
  return (
    <li key={hotel.hotel_ID} className="hotel-item">
      <p className="hotel-id">Hotel ID: {hotel.hotel_ID}</p>
      <p className="hotel-name">Name: {hotel.name}</p>
      <p className="hotel-address">Address: {hotel.address}</p>
      <p className="hotel-rating">Star rating: {hotel.star_rating}</p>
      <p className="hotel-email">Contact email: {hotel.contact_email}</p>
      <p className="hotel-phone">Phone number: {hotel.phone_number}</p>
      <p className="hotel-rooms">Number of rooms: {hotel.number_of_rooms}</p>
      <p className="hotel-manager">Manager: {hotel.manager}</p>
    </li>
  );
}

// function EmployeeListItem({ employee }) {
//   return (
//     <li key={employee.employe_ID} className="employee-item">
//       <p className="employee-id">Hotel ID: {employee.employe_ID}</p>
//       <p className="employee-name">Name: {employee.full_name}</p>
//       <p className="employee-position">Address: {employee.position}</p>
//     </li>
//   );
// }

function LocationCard(props) {
  return (
    <div className="grid-item">
      <img className="card-img" src={props.imageSrc} alt={props.imageAlt} />
      <div className="card-content">
        <h1 className="card-header">{props.locationName}</h1>
        <p className="card-text">{props.locationDescription}</p>
      </div>
    </div>
  );
}

function OurWonderfulLocations() {
  return (
    <div className="locations">
      <div className="grid">
        <LocationCard
          imageSrc={torontoimg}
          imageAlt="Picture of Toronto"
          locationName="Toronto"
          locationDescription="A bustling and multicultural metropolis, famous for its iconic landmarks and thriving arts and culture scene."
        />
        <LocationCard
          imageSrc={montrealimg}
          imageAlt="Picture of Montreal"
          locationName="Montreal"
          locationDescription="A vibrant and culturally diverse city in Quebec, Canada,
        famous for its delicious cuisine, historical architecture, and
        lively festivals."
        />
        <LocationCard
          imageSrc={ottawaimg}
          imageAlt="Picture of Ottawa"
          locationName="Ottawa"
          locationDescription="A charming capital of Canada, renowned for its stunning
        government buildings, fascinating museums, and scenic
        waterways."
        />
        <LocationCard
          imageSrc={quebecCityimg}
          imageAlt="Picture of Quebec City"
          locationName="Quebec City"
          locationDescription="A historic city in Quebec, Canada, renowned for its enchanting
        old-world architecture, scenic waterfront, and delicious
        French cuisine."
        />

        <LocationCard
          imageSrc={halifaximg}
          imageAlt="Picture of Halifax"
          locationName="Halifax"
          locationDescription="A beautiful coastal province located in eastern Canada, known
        for its stunning natural landscapes and rich maritime history."
        />

        <LocationCard
          imageSrc={banffimg}
          imageAlt="Picture of Banff"
          locationName="Banff"
          locationDescription="A breathtaking town nestled in the Canadian Rockies, known for
        its world-class skiing, turquoise lakes, and stunning mountain
        vistas."
        />

        <LocationCard
          imageSrc={edmontonimg}
          imageAlt="Picture of Edmonton"
          locationName="Edmonton"
          locationDescription="A gorgeous capital city of Alberta, known for its beautiful river valley, vibrant arts and cultural scene, and long winter season."
        />

        <LocationCard
          imageSrc={saskatoonimg}
          imageAlt="Picture of Saskatoon"
          locationName="Saskatoon"
          locationDescription="A vibrant city located in the heart of Saskatchewan known for its beautiful river valley, rich cultural heritage, and friendly people."
        />
        <LocationCard
          imageSrc={niagaraFallsimg}
          imageAlt="Picture of Niagara Falls"
          locationName="Niagara Falls"
          locationDescription="A stunning city located in Ontario, Canada, known for its breathtaking waterfalls, vibrant tourist attractions, and scenic views."
        />
      </div>
    </div>
  );
}
export default Hotels;
