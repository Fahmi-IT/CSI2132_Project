import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavBarElements';
  
const NavBar = () => {
  return (
    <>
      <Nav>
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
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default NavBar;