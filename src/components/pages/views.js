import React from 'react';
import {useState, useEffect} from 'react';
import './views.css';

const Views = () => {
    var roomCapacities = [];
    var hotCapacities = [];
    const [capacities, setCapacities] = useState(roomCapacities);
    const [hotelCapacities, setHotelCapacities] = useState(hotCapacities);
    const getViewOne = async () => {
        fetch('http://localhost:3001/view1').then(response => {return response.text();})
          .then(data => {
            const obj = JSON.parse(data);
            roomCapacities = [];
            for (let i = 0; i < obj.length; i++) {
                let temp = obj[i];
                let holder = {
                    area: temp["address"],
                    capacity: temp["available_rooms"]
                }
                roomCapacities.push(holder);
            }
            setCapacities(roomCapacities);
          });
    }
    const getViewTwo = async () => {
        fetch('http://localhost:3001/view2').then(response => {return response.text();})
        .then(data => {
          const obj = JSON.parse(data);
          hotCapacities = [];
          for (let i = 0; i < obj.length; i++) {
              let temp = obj[i];
              let holder = {
                  chain: temp["hotel_name"],
                  roomNumber: temp["room_number"],
                  totalCap: temp["total_capacity_of_room"]
              }
              hotCapacities.push(holder);
          }
          setHotelCapacities(hotCapacities);
        });
    }
    useEffect(() => {
        getViewOne();
        getViewTwo();
    }, []);
    function ViewOne({cap}) {
        return (
          <div class="listElem">
            <p>Area: {cap.area}</p>
            <p>Number of Available Rooms: {cap.capacity}</p>
          </div>
        )
      }
    function ViewTwo({pac}) {
        return (
          <div class="listElem">
            <p>Hotel Name: {pac.chain}</p>
            <p>Room Number: {pac.roomNumber}</p>
            <p>Total Capacity: {pac.totalCap}</p>
          </div>
        )
    }
    return (
        <div>
            <table>
                <tr><td>
            <div>
            <ul z-index="5">{capacities.map((roomba) => <ViewOne cap={roomba}/>)}</ul>
            </div>
            </td>
            <td>
            <div>
            <ul z-index="5">{hotelCapacities.map((roomba) => <ViewTwo pac={roomba}/>)}</ul>
            </div>
            </td>
            </tr>
            </table>
        </div>
    )
}

export default Views;