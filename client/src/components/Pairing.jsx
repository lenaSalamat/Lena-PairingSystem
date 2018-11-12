import React from 'react'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import {Navbar, Nav, NavItem, Carousel, NavbarHeader, NavbarBrand} from 'react-bootstrap'
import AddStudent from './Add-student.jsx'
import Home from './Home.jsx'
import $ from 'jquery';
import AppRouter from '../routes/AppRouter.jsx'


class Pairing extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
       student1: '',
       student2:'',
       students:[],
       pairings:[]
    }
     this.onChange=this.onChange.bind(this)
     this.get=this.get.bind(this)
     this.save = this.save.bind(this)
     this.add2 = this.add2.bind(this)

  }
   onChange (e) {
  var name = e.target.name
  var value = e.target.value
    this.setState({[name]: value})
}




    get() {
    $.ajax({
      type: 'GET',
      url: '/Students',
      success: (data) => {
        console.log('lolololo',data)
        this.setState({
          students: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
      
}

add2 () {
    var that = this
    $.ajax({
      url: '/Pairs',
      type: 'POST',
      data: this.state,
      success: (data) => {
        console.log('student added',data)
        that.setState({message: 'student Adeed'})
      },
      error: (err) => {
        console.log('erroooooooooor', err)
      }
    })

  }

  save () {
    axios.put('/Pairs', {
    studentname:this.state.studentname,
    studentlevel:this.state.studentlevel
   
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(err);
  });
  }

  render () {
    var arr= this.state.students;
    return ( 
    <div>
          <h4 id="h4">Set Your Pairing Here</h4>
          <div className='form-group'>
      <br></br>
        </div>

      <div>
      {arr.map(function (rand1,rand2) {
         rand1 = arr[Math.floor(Math.random() * arr.length)];
         if(arr.length > 1){
          do{
            rand2 = arr[Math.floor(Math.random() * arr.length)];
          }while(rand1 == rand2)
         } else {
          if(rand1!== rand2){
            rand1=null;
            rand2=null;
          }
         }
          return (
      <div className='col-sm-3'  key={rand1._id} key={rand2._id} event={rand1} event={rand2} >
<table id="customers">
  <tr>
    <th>Student 1</th>
    <th>Student 2</th>
    <th>Add To History</th>
  </tr>
  <tr>
    <td name='student1' value={this.state.student1=rand1.studentname} onChange={this.onChange}>{rand1.studentname}</td>
    <td name='student2' value={this.state.student2=rand2.studentname} onChange={this.onChange}>{rand2.studentname}</td>
    <p><button id="rem" onClick={this.add2}>Add pairs</button></p>
  </tr>
</table> 
    </div>
          )
        },this
        )}
      </div>
       <p><button id="rem" onClick={this.get}>Get Pairing</button></p>
       <Link to='/History'><button id ="rem">GoTo History</button></Link>
    </div>
     )
    }
  }
export default Pairing
