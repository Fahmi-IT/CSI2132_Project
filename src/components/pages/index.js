import React from "react";
import "./index.css";
import banffImg from "./images/banff-national-park-canada-shutterstock_309219305.jpg";
import loc1 from "./images/loc1.jpg";
import loc2 from "./images/loc2.jpg";
import loc3 from "./images/loc3.jpg";
import loc4 from "./images/loc4.jpg";
import loc5 from "./images/loc5.jpg";
import loc6 from "./images/loc6.jpg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App.js";

const Home = () => {
  const { user, signInEmp, signInCus, signOut, loggedIn, cus_emp } =
    useContext(UserContext);
  return (
    <>
      <div class="homeImage">
        <img src={banffImg} alt="Banff, Canada"></img>
      </div>
      <h3 class="welcome">Welcome.</h3>

      <div class="main-body">
        <h3 class="secondary-title">Ready for Adventure ?</h3>

        <div class="row1">
          <img src={loc1} alt="idk" class="locImage"></img>
          <img src={loc2} alt="idk" class="locImage"></img>
          <img src={loc3} alt="idk" class="locImage"></img>
        </div>

        <div class="row2">
          <img src={loc4} alt="idk" class="locImage"></img>
          <img src={loc5} alt="idk" class="locImage"></img>
          <img src={loc6} alt="idk" class="locImage"></img>
        </div>

        <div class="signUpRedirect">
          <div class="buttonDiv">
            <btn
              onClick={(event) => (window.location.href = "/search")}
              class="button1 btnStyle1"
            >
              Book Now!
            </btn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
