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
  const [canDeleteRoom, setDeleteRoom] = useState("");
  const [canInsertRoom, setInsertRoom] = useState("");
  const [canInsertHotel, setInsertHotel] = useState("");
  const [canDeleteHotel, setDeleteHotel] = useState("");

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
    setDeleteRoom(false);
    setInsertRoom(false);
    setInsertHotel(false);
    setDeleteHotel(false);
  };

  const click2 = async (e) => {
    setDeleteCus(true);
    setDeleteEmp(false);
    setCanUpdate(false);
    setCanViewHotels(false);
    setDeleteRoom(false);
    setInsertRoom(false);
    setInsertHotel(false);
    setDeleteHotel(false);
  };

  const click3 = async (e) => {
    setDeleteEmp(true);
    setDeleteCus(false);
    setCanUpdate(false);
    setCanViewHotels(false);
    setDeleteRoom(false);
    setInsertRoom(false);
    setInsertHotel(false);
    setDeleteHotel(false);
  };

  const click4 = async (e) => {
    setDeleteEmp(false);
    setDeleteCus(false);
    setCanUpdate(false);
    setCanViewHotels(false);
    setDeleteRoom(true);
    setInsertRoom(false);
    setInsertHotel(false);
    setDeleteHotel(false);
  };

  const click5 = async (e) => {
    setDeleteEmp(false);
    setDeleteCus(false);
    setCanUpdate(false);
    setCanViewHotels(false);
    setDeleteRoom(false);
    setInsertRoom(true);
    setInsertHotel(false);
    setDeleteHotel(false);
  };

  const click6 = async (e) => {
    setDeleteEmp(false);
    setDeleteCus(false);
    setCanUpdate(false);
    setCanViewHotels(false);
    setDeleteRoom(false);
    setInsertRoom(false);
    setInsertHotel(true);
    setDeleteHotel(false);
  };

  const click7 = async (e) => {
    setDeleteEmp(false);
    setDeleteCus(false);
    setCanUpdate(false);
    setCanViewHotels(false);
    setDeleteRoom(false);
    setInsertRoom(false);
    setInsertHotel(false);
    setDeleteHotel(true);
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
    const SSN = formData.get("SSN");
    const employee = {
      SSN: SSN,
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

  const addRom = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const room_Number = formData.get("room_Number");
    const PPN = formData.get("ppn");
    const view = formData.get("view");
    const extend = formData.get("extend");
    const amenities = formData.get("amenities");
    const capacity = formData.get("capacity");
    const problems = formData.get("problems");
    const hotel_ID = formData.get("hotel_ID");
    const room = {
      roomNumber: parseInt(room_Number),
      hotelID: hotel_ID,
      PPNe: parseFloat(PPN),
      View: parseInt(view),
      Extend: parseInt(extend),
      Amenities: amenities,
      Capacity: parseInt(capacity),
      Problems: problems,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/insertRoom",
        room
      );
      alert("Successfully inserted room.");
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Failed to insert room.");
    }
  };

  const addHot = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const hotID = formData.get("hotel_ID");
    const nom = formData.get("name");
    const add = formData.get("address");
    const SR = formData.get("star_rating");
    const contact = formData.get("contact_email");
    const num = formData.get("phone_number");
    const mage = formData.get("manager");
    const number_of_rooms = formData.get("number_of_rooms");
    const hotel = {
      hotelID: hotID,
      name: nom,
      address: add,
      starRating: SR,
      contactEmail: contact,
      phoneNumber: num,
      number_of_rooms: number_of_rooms,
      manager: mage,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/insertHotel",
        hotel
      );
      alert("Successfully inserted hotel.");
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Failed to insert hotel.");
    }
  };

  const deleteRom = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const room_Number = formData.get("room_Number");
    const hotel_ID = formData.get("hotel_ID");
    const room = {
      roomNumber: room_Number,
      hotelID: hotel_ID,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/deleteRoom",
        room
      );
      alert("Successfully deleted room.");
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Failed to delete room.");
    }
  };

  const deleteHot = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const hotel_ID = formData.get("hotel_ID");
    const hotel = {
      hotel_ID: hotel_ID,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/deleteHotel",
        hotel
      );
      alert("Successfully deleted hotel and corresponding rooms.");
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Failed to delete hotel and corresponding rooms.");
    }
  };

  function DeleteHotel() {
    return (
      <form className="update-hotel-form" onSubmit={deleteHot}>
        <h3>Delete Hotel</h3>

        <label htmlFor="hotel_ID">Hotel ID</label>
        <input
          type="text"
          placeholder="Hotel ID"
          id="hotel_ID"
          name="hotel_ID"
        />
        <button className="updateBtn" type="submit">
          Delete Hotel
        </button>
      </form>
    );
  }

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

        <label htmlFor="Address">Employee SSN</label>
        <input type="text" placeholder="SSN" id="SSN" name="SSN" />
        <button className="updateBtn" type="submit">
          Delete Employee
        </button>
      </form>
    );
  }

  function DeleteRoom() {
    return (
      <form className="update-hotel-form" onSubmit={deleteRom}>
        <h3>Delete Room</h3>

        <label htmlFor="room_Number">Room Number</label>
        <input
          type="number"
          placeholder="Room Number"
          id="room_Number"
          name="room_Number"
        />
        <label htmlFor="hotel_ID">Hotel ID</label>
        <input
          type="text"
          placeholder="Hotel ID"
          id="hotel_ID"
          name="hotel_ID"
        />
        <button className="updateBtn" type="submit">
          Delete Room
        </button>
      </form>
    );
  }

  function InsertRoom() {
    return (
      <form className="update-hotel-form" onSubmit={addRom}>
        <h3>Insert Room</h3>

        <label htmlFor="room_Number">Room Number</label>
        <input
          type="number"
          placeholder="Room Number"
          id="room_Number"
          name="room_Number"
        />
        <label htmlFor="ppn">Price Per Night</label>
        <input
          type="number"
          placeholder="Price Per Night"
          id="ppn"
          name="ppn"
        />
        <label htmlFor="view">View</label>
        <input type="number" placeholder="View" id="view" name="view" />
        <label htmlFor="amen">Amenities</label>
        <input
          type="text"
          placeholder="Amenities"
          id="amenities"
          name="amenities"
        />
        <label htmlFor="cap">Capacity</label>
        <input
          type="number"
          placeholder="Capacity"
          id="capacity"
          name="capacity"
        />
        <label htmlFor="extend">Extendable</label>
        <input
          type="number"
          placeholder="Extendable"
          id="extend"
          name="extend"
        />
        <label htmlFor="prob">Problems</label>
        <input
          type="text"
          placeholder="Problems"
          id="problems"
          name="problems"
        />
        <label htmlFor="hotel_ID">Hotel ID</label>
        <input
          type="text"
          placeholder="Hotel ID"
          id="hotel_ID"
          name="hotel_ID"
        />
        <button className="updateBtn" type="submit">
          Insert Room
        </button>
      </form>
    );
  }

  function InsertHotel() {
    return (
      <form className="update-hotel-form" onSubmit={addHot}>
        <h3>Insert Hotel</h3>

        <label htmlFor="hotel_ID">Hotel ID</label>
        <input
          type="text"
          placeholder="Hotel ID"
          id="hotel_ID"
          name="hotel_ID"
        />
        <label htmlFor="name">Name</label>
        <input type="text" placeholder="Name" id="name" name="name" />
        <label htmlFor="address">Address</label>
        <input type="text" placeholder="Address" id="address" name="address" />
        <label htmlFor="star_rating">Star Rating</label>
        <input
          type="number"
          placeholder="Star Rating"
          id="star_rating"
          name="star_rating"
        />
        <label htmlFor="star_rating">Number of Rooms</label>
        <input
          type="number"
          placeholder="number_of_rooms"
          id="number_of_rooms"
          name="number_of_rooms"
        />
        <label htmlFor="contact_email">Contact Email</label>
        <input
          type="text"
          placeholder="Contact Email"
          id="contact_email"
          name="contact_email"
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          id="phone_number"
          name="phone_number"
        />
        <label htmlFor="manager">Manager Name</label>
        <input
          type="text"
          placeholder="Manager Name"
          id="manager"
          name="manager"
        />
        <button className="updateBtn" type="submit">
          Insert Hotel
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
          Update Hotel Information
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
              <button className="empButton detailButton" onClick={click4}>
                Delete Room
              </button>
              <button className="empButton detailButton" onClick={click5}>
                Add Room
              </button>
              <button className="empButton detailButton" onClick={click6}>
                Add Hotel
              </button>
              <button className="empButton detailButton" onClick={click7}>
                Delete Hotel
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
          {canDeleteRoom && <DeleteRoom />}
          {canInsertRoom && <InsertRoom />}
          {canInsertHotel && <InsertHotel />}
          {canDeleteHotel && <DeleteHotel />}
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
