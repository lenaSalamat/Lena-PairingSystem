import React from 'react'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import {Navbar, Nav, NavItem, Carousel, NavbarHeader, NavbarBrand} from 'react-bootstrap'
import AddStudent from '../components/Add-student.jsx'
import Home from '../components/Home.jsx'
import Pairing from '../components/Pairing.jsx'
import History from '../components/History.jsx'

class AppRouter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render () {
    return (
      <div>
      <BrowserRouter>
        <div id='navbar'>
          <Switch>
            <Route exact path='/'  component={Home} />
            <Route path='/Add-student' component={AddStudent} />
            <Route path='/History' component={History} />
            <Route path='/Pairing' component={Pairing} />
          </Switch>
        </div>
      </BrowserRouter>
     </div>
    )
  }
}
export default AppRouter
