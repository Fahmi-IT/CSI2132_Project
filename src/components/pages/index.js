import React from "react";
import "./index.css";
import banffImg from "./images/banff-national-park-canada-shutterstock_309219305.jpg";
import loc1 from "./images/loc1.jpg";
import loc2 from "./images/loc2.jpg";
import loc3 from "./images/loc3.jpg";
import loc4 from "./images/loc4.jpg";
import loc5 from "./images/loc5.jpg";
import loc6 from "./images/loc6.jpg";

const Home = () => {
  return (
    <>
      <div class="homeImage">
        <img src={banffImg} alt="Banff, Canada"></img>
      </div>
      <h3 class="welcome">Welcome.</h3>
      <div class="main-body">
        <h3 class="locText">Ready for Adventure ?</h3>
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
          {/* <h3 class="Ready">Ready for Adventure?</h3> */}
          <div class="buttonDiv">
            <btn
              onClick={(event) => (window.location.href = "/search")}
              class="button btnStyle"
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
