import React, {useState, useEffect, useContext} from 'react';
import "./searchbar.css";
import { UserContext } from "../../../App.js";
import axios from "axios";

function SearchBar() {
  var roomers = [];
  var Hhotels = [];
  var Hhotel_chains = [];
  var Bbookings = [];
  var rrentings = [];
  const { loggedIn, cus_emp } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [customerID, setCustomerID] = useState('');
  useEffect(() => {
    if (!loggedIn) {
      window.location.replace("http://localhost:3000/signup");
    }
  }, [loggedIn]);
  const [content, setContent] = useState({
    capacity: 0,
    price: null,
    rating: 0,
    numRooms: 0,
    area: "",
    chain: "",
    startY: "",
    startM: "",
    startD: "",
    endY: "",
    endM: "",
    endD: ""});
  const [cc, setCC] = useState({
    ccNumber: "",
    CV: "",
    expirationDate: ""
  })
  const [bookings, setBookings] = useState(Bbookings);
  const [hotelChain, setHotelChain] = useState(Hhotel_chains);
  const [hotels, setHotels] = useState(Hhotels);
  const [rooms, setRooms] = useState(roomers);
  const [rentings, setRentings] = useState(rrentings);
  const handleChange = (e) => {
    setContent((prev) => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }))
  }
  const handleCCChange = (e) => {
    setCC((prev) => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    getRooms();
    getHotels();
    getHotelChains();
    getBookings();
    getRentings();
  }, []);
  useEffect(() => {
    getRooms();
  }, [content])
  function findHotel(room) {
    for (let i = 0; i < hotels.length; i++) {
      if (hotels[i].hotelID === room.hotel_ID) {
        return hotels[i];
      }
    }
    return false;
  }
  function findHotelChain(holte) {
    for (let i = 0; i < hotelChain.length; i++) {
      if (holte.name === hotelChain[i].name) {
        return hotelChain[i];
      }
    }
    return false;
  }
  function findBooking(room) {
    var from = 0;
    var to = 1;
    if (content.startY != null && content.startM != null && content.startD != null) {
      from = new Date(content.startY, content.startM, content.startD);
    }
    if (content.endY != null && content.endM != null && content.endD != null) {
      to = new Date(content.endY, content.endM, content.endD);
    }
    if (from === 0) {
      return false;
    } else if (from > to) {
      return false;
    }
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].roomNumber === room.roomNumber) {
        let pre = new Date(bookings[i].startDate.substring(0, 4), bookings[i].startDate.substring(5, 7), bookings[i].startDate.substring(8, 10));
        let post = new Date(bookings[i].endDate.substring(0, 4), bookings[i].endDate.substring(5, 7), bookings[i].endDate.substring(8, 10));
        if ((from <= pre && to >= post) || (from >= pre && to <= post) || (from <= pre && to <= post) || (from >= pre && to <= post)) {
          return false;
        }
      }
    }
    return true;
  }
  function findRenting(room) {
    var from = 0;
    var to = 1;
    if (content.startY != null && content.startM != null && content.startD != null) {
      from = new Date(content.startY, content.startM, content.startD);
    }
    if (content.endY != null && content.endM != null && content.endD != null) {
      to = new Date(content.endY, content.endM, content.endD);
    }
    if (from === 0) {
      return false;
    } else if (from > to) {
      return false;
    }
    for (let i = 0; i < rentings.length; i++) {
      if (rentings[i].roomNumber === room.roomNumber) {
        let pre = new Date(rentings[i].checkIn.substring(0, 4), rentings[i].checkIn.substring(5, 7), rentings[i].checkIn.substring(8, 10));
        let post = new Date(rentings[i].checkOut.substring(0, 4), rentings[i].checkOut.substring(5, 7), rentings[i].checkOut.substring(8, 10));
        if ((from < pre && to > post) || (from > pre && to < post) || (from < pre && to < post) || (from > pre && to < post)) {
          return false;
        }
      }
    }
    return true;
  }
  function passFilter(room) {
    var temp = findHotel(room);
    var chainz = findHotelChain(temp);
    if (content.capacity != null) {
      if (parseInt(room.capacity) < parseInt(content.capacity)) {
        return false;
      }
    }
    if (content.price != null) {
      if (parseFloat(room.PPN) > parseFloat(content.price)) {
        return false;
      }
    }
    if (content.rating != null) {
      if (parseFloat(temp.starRating) < parseFloat(content.rating)) {
        return false;
      }
    }
    if (content.numRooms != null) {
      if (parseInt(temp.numberOfRooms) < parseInt(content.numRooms)) {
        return false;
      }
    }
    if (content.area !== null && content.area.trim() !== "") {
      if (!(temp.address.toLowerCase().includes(content.area.trim().toLowerCase()))) {
        return false;
      }
    }
    if (content.chain !== null && content.chain.trim() !== "") {
      if (!(chainz.name.toLowerCase().includes(content.chain.trimEnd().toLowerCase()))) {
        return false;
      }
    }
    if (content.startY.trim() !== "" && content.startM.trim() !== "" && content.startD.trim() !== "" && content.endY.trim() !== "" && content.endM.trim() !== "" && content.endD.trim() !== "") {
      if (!(findBooking(room))) {
        return false;
      }
    }
    if (content.startY.trim() !== "" && content.startM.trim() !== "" && content.startD.trim() !== "" && content.endY.trim() !== "" && content.endM.trim() !== "" && content.endD.trim() !== "") {
      if (!(findRenting(room))) {
        return false;
      }
    }
    return true;
  }
  const getRooms = async () => {
    fetch('http://localhost:3001/').then(response => {return response.text();})
      .then(data => {
        const obj = JSON.parse(data);
        roomers = [];
        for (let i = 0; i < obj.length; i++) {
          let temp = obj[i];
          var roome = {
            roomNumber: temp["room_number"],
            amenities: temp["amenities"],
            problems: temp["problems"],   
            view: " " + temp["view"],
            PPN: temp["price_per_night"],
            hotel_ID: temp["hotel_ID"],
            capacity: temp["capacity"],
            extendable: " " + temp["extendable"]
          }
          if (passFilter(roome)) {
            roomers.push(roome);
          }
        }
        setRooms(roomers);
      });
  }
  function getHotels() {
    fetch('http://localhost:3001/hotel').then(response => {return response.text();})
    .then(data => {
      const obj = JSON.parse(data);
      Hhotels = [];
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i];
        let hotel = {
          hotelID: temp["hotel_ID"],
          name: temp["name"],
          address: temp["address"],
          starRating: temp["star_rating"],
          contactEmail: temp["contact_email"],
          phoneNumber: temp["phone_number"],
          numberOfRooms: temp["number_of_rooms"],
          manager: temp["manager"]
        }
        Hhotels.push(hotel);
      }
      setHotels(Hhotels);
    });
  }
  function getHotelChains() {
    fetch('http://localhost:3001/hotel_chain').then(response => {return response.text();})
    .then(data => {
      const obj = JSON.parse(data);
      Hhotel_chains = [];
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i];
        let chain = {
          name: temp["name"],
          numberOfHotels: temp["number_of_hotels"],
          centralOfficeAddress: temp["central_office_address"]
        }
        Hhotel_chains.push(chain);
      }
      setHotelChain(Hhotel_chains);
    })
  }
  function getBookings() {
    fetch('http://localhost:3001/bookings').then(response => {
      return response.text();
    }).then(data => {
      const obj = JSON.parse(data);
      Bbookings = [];
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i]
        let booking = {
          bookingID: temp["booking_id"],
          roomNumber: temp["room_number"],
          startDate: temp["start_date"],
          endDate: temp["end_date"],
          customerID: temp["customer_id"]
        }
        Bbookings.push(booking);
      }
      setBookings(Bbookings)
    })
  }
  function getCustomer() {
    fetch('http://localhost:3001/getCustomers').then(response => {return response.text();})
    .then(data => {
      const obj = JSON.parse(data);
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i];
        if (temp["SSN"] === user) {
          setCustomerID(temp["customer_ID"])
        }
      }
    });
  }
  function getRentings() {
    fetch('http://localhost:3001/rentings').then(response => {
      return response.text();
    }).then(data => {
      const obj = JSON.parse(data);
      Bbookings = [];
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i]
        let rent = {
          roomNumber: temp["room_number"],
          checkIn: temp["check_in_date"],
          checkOut: temp["check_out_date"],
          bookingID: temp["booking_ID"],
          customerID: temp["customer_ID"]
        }
        rrentings.push(rent);
      }
      setRentings(rrentings);
    })
  }
  const submitBooking = async (e, number) => {
    e.preventDefault();
    getCustomer();
    if (!(cc.ccNumber.trim() === "" || cc.CV.trim() === "" || cc.expirationDate.trim() === "" || content.startY.trim() === "" || content.startM.trim() === "" || content.startD.trim() === "" || content.endY.trim() === "" || content.endM.trim() === "" || content.endD.trim() === "")) {
      let start = new Date(content.startY, content.startM, content.startD);
      let end = new Date(content.endY, content.endM, content.endD);
      console.log(start);
      const bookingMan = {booking_ID: "00011", room_number: number, start_date: start, end_date: end, customer_id: customerID}
      try {
        await axios.post("http://localhost:3001/bookingsMake", bookingMan);
        console.log("Booking added");
      } catch (err) {
        console.log(err);
      }
      alert("Booking Successful.");
    } else {
      alert("Error. Unable to book. Please review credentials.");
    }
  }
  function Room({roomIT}) {
    return (
      <div class="listElem">
        <p>Amenities: {roomIT.amenities}</p>
        <p>Price Per Night: {roomIT.PPN}</p>
        <p>Capacity: {roomIT.capacity}</p>
        <p>Extendable: {roomIT.extendable}</p>
        <p>Room #: {roomIT.roomNumber}</p>
        <button onClick={(event) => submitBooking(event, roomIT.roomNumber)}>Book</button>
      </div>
    )
  }
  return (
    <>
      <div width="100%">
      <div className="dates">
        <table className="anotherTable">
        <tr><td className="smolPad"><label for="startDate">Start Date</label></td></tr>
        <tr><td><input name="startY" onChange={handleChange} placeholder="YYYY" type="number"/>
        <input name="startM" onChange={handleChange} placeholder="MM" type="number"/>
        <input name="startD" onChange={handleChange} placeholder="DD" type="number"/></td></tr>
        <tr><td><label for="endDate">End Date</label></td></tr>
        <tr><td><input name="endY" onChange={handleChange} placeholder="YYYY" type="number"/>
        <input name="endM" onChange={handleChange} placeholder="MM" type="number"/>
        <input name="endD" onChange={handleChange} placeholder="DD" type="number"/>
        </td></tr>
        </table>
        </div>
        <table>
        <div className="options">
        <tr><td>
        <table>
        <tr><td><label for="capacity">Capacity</label></td>
        <td><input name="capacity" onChange={handleChange} type="number"/></td></tr>
        <tr><td><label for="area">Area</label></td>
        <td><input name="area" onChange={handleChange} type="text"/></td></tr>
        <tr><td><label for="hotelChain">Hotel Chain</label></td>
        <td><input name="chain" onChange={handleChange} type="text"/></td></tr>
        </table>
        </td>
        <td>
        <table className="smallPad">
        <tr><td><label for="rating">Rating</label></td>
        <td><input name="rating" onChange={handleChange} type="number"/></td></tr>
        <tr><td><label for="numberOfRooms">Number Of Rooms</label></td>
        <td><input name="numRooms" onChange={handleChange} type="number"/></td></tr>
        <tr><td><label for="PPN">Price of Rooms</label></td>
        <td><input name="price" onChange={handleChange} type="text"/></td></tr>
        </table>
        </td>
        </tr>
        </div>
        <tr>
          <td>
          <table className="cc">
          <tr>
          <td><label>Credit Card Number</label></td>
          <td><input name="ccNumber" onChange={handleCCChange} type="text"></input></td>
          </tr>
          <tr>
          <td><label>CV</label></td>
          <td><input name="CV" onChange={handleCCChange} type="text"></input></td>
          </tr>
          <tr>
          <td><label>Date of Expiration</label></td>
          <td><input name="expirationDate" onChange={handleCCChange} type="text"></input></td>
          </tr>
          </table>
          </td>
        </tr>
        </table>
      </div>
      <div class="containerList"><ul z-index="5">{rooms.map((roomba) => <Room roomIT={roomba}/>)}</ul>
      </div>
    </>
  );
}

export default SearchBar;