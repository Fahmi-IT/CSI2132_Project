import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import "./searchbar.css";

function SearchBar() {
  var roomers = [];
  var Hhotels = [];
  var Hhotel_chains = [];
  var Bbookings = [];
  const [bookings, setBookings] = useState(Bbookings);
  const [hotelChain, setHotelChain] = useState(Hhotel_chains);
  const [hotels, setHotels] = useState(Hhotels);
  const [rooms, setRooms] = useState(roomers);
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [area, setArea] = useState('');
  const [chain, setChain] = useState('');
  const [startY, setStartY] = useState('');
  const [startM, setStartM] = useState('');
  const [startD, setStartD] = useState('');
  const [endY, setEndY] = useState('');
  const [endM, setEndM] = useState('');
  const [endD, setEndD] = useState('');
  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
    console.log(capacity);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }
  const handleNumRoomsChange = (e) => {
    setNumRooms(e.target.value);
  }
  const handleAreaChange = (e) => {
    setArea(e.target.value);
  }
  const handleChainChange = (e) => {
    setChain(e.target.value);
  }
  const handleStartYChange = (e) => {
    setStartY(e.target.value);
  }
  const handleStartMChange = (e) => {
    setStartM(e.target.value);
  }
  const handleStartDChange = (e) => {
    setStartD(e.target.value);
  }
  const handleEndYChange = (e) => {
    setEndY(e.target.value);
  }
  const handleEndMChange = (e) => {
    setEndM(e.target.value);
  }
  const handleEndDChange = (e) => {
    setEndD(e.target.value);
  }
  useEffect(() => {
    getRooms();
    getHotels();
    getHotelChains();
    getBookings();
  }, []);
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
    if (startY != null && startM != null && startD != null) {
      from = new Date(startY, startM, startD);
    }
    if (endY != null && endM != null && endD != null) {
      to = new Date(endY, endM, endD);
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
        if (from < post || to > pre) {
          return false;
        }
      }
    }
    return true;
  }
  function passFilter(room) {
    var temp = findHotel(room);
    var chainz = findHotelChain(temp);
    if (capacity != null) {
      if (parseInt(room.capacity) < parseInt(capacity)) {
        return false;
      }
    }
    if (price != null) {
      if (parseFloat(room.PPN) > parseFloat(price)) {
        return false;
      }
    }
    if (rating != null) {
      if (parseFloat(temp.starRating) < parseFloat(rating)) {
        return false;
      }
    }
    if (numRooms != null) {
      if (parseInt(temp.numberOfRooms) < parseInt(numRooms)) {
        return false;
      }
    }
    if (area != null && area.trim() !== "") {
      if (!(temp.address.toLowerCase().includes(area.trim().toLowerCase()))) {
        return false;
      }
    }
    if (chain != null && chain.trim() !== "") {
      if (!(chainz.name.toLowerCase().includes(chain.trimEnd().toLowerCase()))) {
        return false;
      }
    }
    if (startY != null && startM != null && startD != null && endY != null && endM != null && endD != null) {
      if (!(findBooking(room))) {
        return false;
      }
    }
    return true;
  }
  function getRooms() {
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
  function Room({roomIT}) {
    return (
      <div class="listElem">
        <p>Amenities: {roomIT.amenities}</p>
        <p>Price Per Night: {roomIT.PPN}</p>
        <p>Capacity: {roomIT.capacity}</p>
        <p>Extendable: {roomIT.extendable}</p>
        <p>Room #: {roomIT.roomNumber}</p>
        <Popup trigger={<button>Book</button>} position="right center">
          <div>Test</div>
        </Popup>
      </div>
    )
  }
  return (
    <>
      <div width="100%">
      <form class="searchFields">
        <h3>Search</h3>
        <label for="startDate">Start Date</label>
        <div>
        <input onChange={handleStartYChange} placeholder="YYYY" type="number"/>
        <input onChange={handleStartMChange} placeholder="MM" type="number"/>
        <input onChange={handleStartDChange} placeholder="DD" type="number"/>
        </div>
        <label for="endDate">End Date</label>
        <div>
        <input onChange={handleEndYChange} placeholder="YYYY" type="number"/>
        <input onChange={handleEndMChange} placeholder="MM" type="number"/>
        <input onChange={handleEndDChange} placeholder="DD" type="number"/>
        </div>
        <label for="capacity">Capacity</label>
        <input onChange={handleCapacityChange} type="number"/>
        <label for="area">Area</label>
        <input onChange={handleAreaChange} type="text"/>
        <label for="hotelChain">Hotel Chain</label>
        <input onChange={handleChainChange} type="text"/>
        <label for="rating">Rating</label>
        <input onChange={handleRatingChange} type="number"/>
        <label for="numberOfRooms">Number Of Rooms</label>
        <input onChange={handleNumRoomsChange} type="number"/>
        <label for="PPN">Price of Rooms</label>
        <input onChange={handlePriceChange} type="text"/>
      </form>
      <button>Nothing</button>
      <button onClick={getRooms()}>Fetch</button>
      </div>
      <div class="containerList"><ul z-index="5">{rooms.map((roomba) => <Room roomIT={roomba}/>)}</ul></div>
    </>
  );
}

export default SearchBar;