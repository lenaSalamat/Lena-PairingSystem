import React from 'react'
import $ from 'jquery';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import {Navbar, Nav, NavItem, Carousel, NavbarHeader, NavbarBrand} from 'react-bootstrap'
import AddStudent from './Add-student.jsx'
import Home from './Home.jsx'
import AppRouter from '../routes/AppRouter.jsx'


class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      student1:'',
      student2:'',
      pairings:[]
    }
  }

 componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/Pairs',
      success: (data) => {
        console.log('lolololo',data)
        this.setState({
          pairings: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
      
}

  render () {
var arr= this.state.pairings;
    return (
      <div>
<h4 id="h4">Here Is Your Pairings History</h4>
 <div>
      {arr.map(function (paring) {
          return (
      <div className='col-sm-3'  key={paring._id} event={paring} >
<table id="customers">
  <tr>
    <th>Student1</th>
    <th>Student2</th>
  </tr>
  <tr>
    <td>{paring.student1}</td>
    <td>{paring.student2}</td>
  </tr>
</table> 
    </div>
          )
        },this
        )}
      </div>
     </div>
    )
  }
}
export default History
