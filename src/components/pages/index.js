import React from 'react';
import banffImg from './banff-national-park-canada-shutterstock_309219305.jpg'
  
const Home = () => {
  return (
      <><div class="homeImage">
      <img src={banffImg} alt="Banff, Canada"></img>
    </div><h3 class="Welcome">Welcome.</h3></>
  );
};
  
export default Home;