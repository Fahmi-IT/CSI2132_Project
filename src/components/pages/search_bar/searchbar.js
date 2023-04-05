import React, {useState, useEffect} from 'react';
import "./searchbar.css";

function SearchBar() {
  var roomers = [];
  const [rooms, setRooms] = useState(roomers);
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
    console.log(capacity);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    console.log(price);
  }
  useEffect(() => {
    getRooms();
  }, []);
  function passFilter(room) {
    var resulting = true;
    if (capacity != null) {
      if (parseInt(room.capacity) < parseInt(capacity)) {
        resulting = false;
      }
    }
    if (price != null) {
      if (parseInt(room.PPN) > parseInt(price)) {
        resulting = false;
      }
    }
    return resulting;
  }
  function getRooms() {
    fetch('http://localhost:3001/').then(response => {return response.text();})
      .then(data => {
        const obj = JSON.parse(data);
        roomers = [];
        for (let i = 0; i < obj.length; i++) {
          let temp = obj[i];
          let roome = {
            roomNumber: temp["room_number"],
            amenities: temp["amenities"],
            problems: temp["problems"],   
            view: " " + temp["view"],
            PPN: temp["price_per_night"],
            hotel_ID: temp["hotel_id"],
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
  function Room({roomIT}) {
    return (
      <div class="listElem">
        <p>Amenities: {roomIT.amenities}</p>
        <p>Price Per Night: {roomIT.PPN}</p>
        <p>Capacity: {roomIT.capacity}</p>
        <p>Extendable: {roomIT.extendable}</p>
        <button>Book</button>
      </div>
    )
  }
  return (
    <>
      <div width="100%">
      <form class="searchFields">
        <h3>Search</h3>
        <label for="startDate">Start Date</label>
        <input type="text"/>
        <label for="endDate">End Date</label>
        <input type="text"/>
        <label for="capacity">Capacity</label>
        <input onChange={handleCapacityChange} type="number"/>
        <label for="area">Area</label>
        <input type="text"/>
        <label for="hotelChain">Hotel Chain</label>
        <input type="text"/>
        <label for="rating">Rating</label>
        <input type="text"/>
        <label for="numberOfRooms">Number Of Rooms</label>
        <input type="text"/>
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