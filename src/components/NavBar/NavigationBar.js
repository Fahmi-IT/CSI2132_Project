/*JS for Loading Screen*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "../NavBar"
import Home from '../pages/index';
import About from '../pages/about';

function NavigationBar() {
    return(
        <Router>
            <NavBar />
                <Routes>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' component={About} />
                </Routes>
        </Router>
    )
}

export default NavigationBar;