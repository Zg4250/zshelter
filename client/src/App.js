import React, { Component } from 'react';
import "react-router";
import {BrowserRouter,Route,} from 'react-router-dom';
import './App.css';
import petdashboard from './components/petdashboard';
import addpetform from './components/addpetform';
import petdetails from './components/petdetails';
import editpetform from './components/editpetform';





class App extends Component {
  
  render() {
    return (
      <div className="Container">
        <h1>Pet Shelter</h1>
       
        <BrowserRouter>
          <Route exact path="/" component = {petdashboard}/>
          <Route path = "/pets/new" component = {addpetform}/>
          <Route path = "/pets/:_id/details" component = {petdetails}/>
          <Route path = "/pets/:_id/edit" component = {editpetform}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
