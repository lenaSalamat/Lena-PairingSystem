import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import {Navbar, Nav, NavItem, Carousel, NavbarHeader, NavbarBrand} from 'react-bootstrap'
import $ from 'jquery';
import AppRouter from '../routes/AppRouter.jsx'


class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return ( 
     <div id="home">
       <Link to='/Add-student'><button id ="button"> Add student</button></Link>
       <Link to='/Pairing'><button id ="button"> Pairing</button></Link>
       <Link to='/History'><button id ="button">History</button></Link>
       <p id="p"> ★★★★ </p> 
       <p id="p2"> ★★★ </p> 
       <p id="p3"> ★★ </p> 
       <p id="p4"> ★ </p>
     </div>
    )
  }
}

export default Home