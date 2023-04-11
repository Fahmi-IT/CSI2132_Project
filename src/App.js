import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/index";
import About from "./components/pages/about";
import Booking from "./components/pages/booking";
import Hotels from "./components/pages/hotels";
import ViewProfile from "./components/pages/settings";
import Search from "./components/pages/search";
import SignUp from "./components/pages/signup";
import Views from "./components/pages/views";

import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  user: null,
  signInEmp: () => {},
  signInCus: () => {},
  signOut: () => {},
  loggedIn: false,
  cus_emp: false,
});

function App() {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [cus_emp, setCus_emp] = useState(false);

  useEffect(() => {
    const userKey = JSON.parse(localStorage.getItem("SSN"));
    if (userKey) {
      console.log("Found user in local storage:" + userKey);
      setUser(userKey);
      setLoggedIn(true);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  const signOut = () => {
    setUser(null);
    setLoggedIn(false);
    setCus_emp(false);
  };

  const signInCus = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("SSN saved as " + user);
    setLoggedIn(true);
    console.log("User logged in:" + user.data);
    setCus_emp(true);
  };

  const signInEmp = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedIn(true);
    console.log("User logged in:" + user);
    setCus_emp(false);
  };
  return (
    <>
      <UserContext.Provider
        value={{ user, signInEmp, signInCus, signOut, loggedIn, cus_emp }}
      >
        <div className="App">
          <div class="navbar">
            <Router>
              <NavBar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/views">
                <Views />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/booking">
                <Booking />
              </Route>
              <Route exact path="/hotels">
                <Hotels />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>
              <Route exact path="/settings">
                <ViewProfile />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Router>
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
