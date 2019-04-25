import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function bubbleSort(arr, key) {
  for(let i=0; i<arr.length-1; i++){
      for(let j=0; j<arr.length-1-i; j++){
          if(arr[j][key] > arr[j+1][key]){
              let temp = arr[j];
              arr[j] = arr[j+1];
              arr[j+1] = temp;
          }
      }
  }
  return arr;
}

class petdashboard extends Component {
    constructor(props){
        super(props);
        this.state ={
            pets:[]
        }
    }
    rankPets=() =>{
      let pets = [...this.state.pets];
      pets = bubbleSort(pets, "type");
      this.setState({pets: pets});
    }
    getPets = () =>{
        axios.get("/pets")
          .then(res => {
            this.setState({pets: res.data.pets}, () => {
              this.rankPets();
            });
            
          }).catch(err => {
            console.log(err);
          });
      }
      componentDidMount =() =>{
        this.getPets();
      }
    render(){
        return (
            <div>
                 <h2>These Pets are Looking for a Home!</h2>
                    <div id="div">
                    <h2 id="h2div">Availible Pets</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.pets.map(pet =>
                                    <tr key ={pet._id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.type}</td>
                                        <td>
                                            <Link
                                                to ={"/pets/"+pet._id+"/details"}>
                                                <button id="dbtton">Details</button>
                                            </Link>
                                            <Link
                                                to ={"/pets/"+pet._id+"/edit"}>
                                                <button id="dbtton">Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    )
                            }
                        </tbody>
                    </table>
                    <Link to = '/pets/new'><button id="dbtton2">Add a pet to the shelter</button></Link>
                    </div>
            </div> 
        );
    }
}
export default petdashboard;