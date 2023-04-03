import React, {useState, useEffect} from 'react';
import "./searchbar.css";

function SearchBar() {
  var roomers = [];
  const [price, setPrice] = useState(roomers);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getRooms();
  }, []);
  const priceChangeHandler = e => {
    const value = e.target.value;
    if (value === 50.00) {
      setPrice(
        roomers.filter(roomer => {
          if (roomer.PPN % 2 === 0) {
            return true;
          } else {
            return false;
          }
        })
      )
    }
  }
  function getRooms() {
    fetch('http://localhost:3001/').then(response => {return response.text();})
      .then(data => {
        console.log(data)
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
          roomers.push(roome);
        }
        console.log(roomers);
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
      <div with="100%">
      <form class="searchFields">
        <h3>Search</h3>
        <label for="startDate">Start Date</label>
        <input type="text"/>
        <label for="endDate">End Date</label>
        <input type="text"/>
        <label for="capacity">Capacity</label>
        <input type="text"/>
        <label for="area">Area</label>
        <input type="text"/>
        <label for="hotelChain">Hotel Chain</label>
        <input type="text"/>
        <label for="rating">Rating</label>
        <input type="text"/>
        <label for="numberOfRooms">Number Of Rooms</label>
        <input type="text"/>
        <label value="50.00" onChange={priceChangeHandler} for="PPN">Price of Rooms</label>
        <input type="text"/>
        <button onClick={getRooms()}>Reset</button>
      </form>
      </div>
      <div class="containerList"><ul z-index="5">{rooms.map((roomba) => <Room roomIT={roomba}/>)}</ul></div>
    </>
  );
}

export default SearchBar;