import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class petdetails extends Component{
    constructor(props){
        super(props);
        this.state ={
            pet: {
                likes: null,
                skills: [],
                  name: "",
                  type: "",
                  description: "",
              }
        }
        
    }
    
    getOne=()=>{
    axios.get(`/pets/${this.props.match.params._id}`)
        .then(res => {
        this.setState({pet: res.data.pet});
        
        }).catch(err => {
        console.log(err);
        })
    }
    componentDidMount =()=>{
        const change = document.getElementById("like");
        if(change.disabled === true){
            change.disabled=false;
        }
        this.getOne();
    }
    delete = (e) => {
        axios.delete(`/pets/${this.props.match.params._id}`)
          .then(res => {
            this.props.history.push('/');
          }).catch(err =>{
            console.log(err);
          })
      }
    like = (e) =>{
        e.likes++;
        const disable = document.getElementById("like");
        disable.disabled = true;


        console.log(e)
        axios.put(`/pets/${this.props.match.params._id}`, e)
        .then(res =>{
          if(res.data.errors){
            this.setState({errors: res.data.errors.errors});
          }
          this.getOne();
        }).catch(err => {
          console.log(err);
        })
    }

    render(){
        return(
            <div>
                <Link to="/"><button id="dbtton3">Home</button></Link>
                <h2>Details about {this.state.pet.name}</h2>
                <div id ="div">
                <table>
                    <tbody>
                        <tr>
                            <td>Name:&nbsp;</td>
                            <td>{this.state.pet.name}</td>
                        </tr>
                        <tr>
                            <td>Type:&nbsp;</td>
                            <td>{this.state.pet.type}</td>
                        </tr>
                        <tr>
                            <td>Description:&nbsp;</td>
                            <td>{this.state.pet.description}</td>
                        </tr>
                        <tr>
                            <td>Interest</td>
                            <td>
                                <ul>
                                    {
                                        this.state.pet.skills.map(( skill, i) =>
                                        <li key = {i}>{skill}</li>)
                                    }
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Likes</td>
                            <td>{this.state.pet.likes}</td>
                        </tr>
                    </tbody>
                </table>
                <div id="div2">
                <button id="like"className="dbtton4" onClick={this.like.bind(this, this.state.pet)}>Like this Pet</button>&nbsp;
                <Link to="/"><button className="dbtton4"onClick={this.delete}>Adopt this Pet</button></Link>&nbsp;
                </div>
                </div>
            </div>
        )
    }
}
export default petdetails;