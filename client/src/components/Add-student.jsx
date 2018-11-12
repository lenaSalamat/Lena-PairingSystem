import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import $ from 'jquery';
import Home from './Home.jsx'
import AppRouter from '../routes/AppRouter.jsx'



class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
       studentname: '',
       studentlevel:'',
       students:[],
       editing:false
    }
     this.onChange=this.onChange.bind(this)
     this.componentDidMount=this.componentDidMount.bind(this)
     this.add=this.add.bind(this)
     this.edit = this.edit.bind(this)
     this.save = this.save.bind(this)
     this.handelChange2 = this.handelChange2.bind(this)
     this.handelChange3 = this.handelChange3.bind(this)
     this.renderedit = this.renderedit.bind(this)
     this.deleteItem = this.deleteItem.bind(this)
  }
   onChange (e) {
  var name = e.target.name
  var value = e.target.value
    this.setState({[name]: value})
}


  add () {
    var that = this
    $.ajax({
      url: '/Students',
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

    componentDidMount() {
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

deleteItem() {
    $.ajax({
        type: "DELETE",
        url: '/Students',
        data: this.state,
        success: function(response) {
            console.log("successfully deleted");
        },
        error: function () {
            console.log("error");
        }
    })
}   

edit () {
    this.setState({
      editing: true
    })
  }
  save () {
    axios.put('/Students', {
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

  handelChange2 (e) {
    this.setState({
      studentname: e.target.value
    })
  }
  handelChange3 (e) {
    this.setState({
      studentlevel: e.target.value
    })
  }


  renderedit () {
    return (
      <div>

            <h4 id="h4">Update Students Here</h4>
      <br></br>
        <div className='form-group'>
          <input id="input" placeholder='Enter The Name Of The Student' value={this.state.studentname} onChange={this.handelChange2}/> 
          <select id="select" onChange={this.handelChange3}>
            <option value='Select'>Select Level</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value=' 3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
      <br></br>
          <button id="button" onClick={this.save}>Save Update</button>
        </div>
      </div>
    )
  }

  render () {
     if (this.state.editing) {
      return (
        this.renderedit()
      )
    } else {
    var arr= this.state.students;
    arr.reverse()
    return ( 
    <div>
      <h4 id="h4">Add Students Hear</h4>
      <br></br>
        <div className='form-group'>
          <input id="input" name='studentname' placeholder='Enter The Name Of The Student' value={this.state.studentname} onChange={this.onChange}/> 
          <select id="select" name='studentlevel' onChange={this.onChange}>
            <option value='Select'>Select Level</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value=' 3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
      <br></br>
          <button id="button" onClick={this.add}> Add students </button>
        </div>
      <div>
      {arr.map(function (student) {
          return (
      <div className='col-sm-3'  key={student._id} event={student} >
<table id="customers">
  <tr>
    <th>Student Name </th>
    <th>Student Level</th>
    <th>Update || Remove Student</th>
  </tr>
  <tr>
    <td>{student.studentname}</td>
    <td>{student.studentlevel}</td>
    <p><button id="rem" onClick={this.deleteItem.bind(this)}>Remove</button></p>
    <p><button id="rem" onClick={this.edit}>Update</button></p>
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
}

export default AddStudent