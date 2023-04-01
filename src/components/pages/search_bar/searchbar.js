import React, {useState, useEffect} from 'react';

function SearchBar() {
  const [room, setRoom] = useState(false);
  useEffect(() => {
    getRooms();
  });
  function getRooms() {
    fetch('http://localhost:3001/')
      .then(response => {
        room = response;
        return response.text();
      })
      .then(data => {
        setRoom(data);
      });
  }
  function createRoom() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRooms();
      });
  }
  function deleteRoom() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRooms();
      });
  }
  return (
    <>
      <div>{room}</div>
      <form>
        <label for="search">Search</label>
        <input type="text"/>
        <button>Submit</button>
      </form>
      </>
  );
}

export default SearchBar;