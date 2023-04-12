import React from "react";
import "./index.css";
import { UserContext } from "../../App";
import { Nav, NavLink, Bars, NavMenu } from "./NavBarElements";
import { useContext } from "react";

const NavBar = () => {
  const { user, signInEmp, signInCus, signOut, loggedIn, cus_emp } =
    useContext(UserContext);

  return (
    <>
      <Nav>
        <p class="logo">Aruma Booking System</p>
        <Bars />
        <NavMenu>
          <NavLink to="/" exact activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/views" activeStyle>
            Views
          </NavLink>
          <NavLink to="/booking" activeStyle>
            Booking
          </NavLink>
          <NavLink to="/hotels" activeStyle>
            Hotels
          </NavLink>
          <NavLink to="/search" activeStyle>
            Search
          </NavLink>
          <NavLink to="/settings" activeStyle>
            Settings
          </NavLink>
          {loggedIn ? (
            <button className="SignOutButton" onClick={signOut}>
              Sign Out
            </button>
          ) : (
            <NavLink to="/signup" activeStyle>
              Sign In
            </NavLink>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
