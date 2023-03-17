import React from "react";
import "./App.css";
import PreLoader1 from "./components/LoadingScreen/PreLoader1"
import NavigationBar from "./components/NavBar/NavigationBar"

function App() {
  return (
    <div className="App">
        <div class="navbar">
          <NavigationBar/>
        </div>
        <div class="loading">
          <PreLoader1/>
        </div>
    </div>
  )
}

export default App;
