import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/index";
import About from "./components/pages/about";
import Booking from "./components/pages/booking";
import Hotels from "./components/pages/hotels";
import Search from "./components/pages/search";
import SignUp from "./components/pages/signup";

function App() {
  return (
    <>
      <div className="App">
        <div class="navbar">
          <Router>
            <NavBar />
            <Route exact path="/">
              <Home />
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
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
