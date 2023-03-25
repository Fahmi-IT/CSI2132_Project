import React from 'react';
import "./index.css";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavBarElements';
  
const NavBar = () => {
  return (
    <>
      <Nav>
        <p class="logo">Aruma Booking System</p>
        <Bars />
        <NavMenu>
          <NavLink to='/' exact activeStyle>
            Home
          </NavLink>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/booking' activeStyle>
            Booking
          </NavLink>
          <NavLink to='/hotels' activeStyle>
            Hotels
          </NavLink>
          <NavLink to='/search' activeStyle>
            Search
          </NavLink>
          <NavLink to='/signup' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavBar;