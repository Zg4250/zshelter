import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
 
class addpetform extends Component{
    constructor(props){
        super(props);
        this.state = {
            pet: {
                name: "",
                type: "",
                description: "",
                skills: []
            },
            errors: {},
            skill1: "",
            skill2: "",
            skill3: "",
        }
    }
    setName = (e) =>{
      this.setState({pet: {...this.state.pet, name: e.target.value}});
    }
    setType = (e) =>{
      this.setState({pet: {...this.state.pet, type: e.target.value}});
    }
    setDesc = (e) =>{
      this.setState({pet: {...this.state.pet, description: e.target.value}});
    }
    setSkill1 = (e) =>{
      this.setState({skill1: e.target.value});
    }
    setSkill2 = (e) =>{
      this.setState({skill2: e.target.value});
    }
    setSkilll3 = (e) =>{
      this.setState({skill3: e.target.value});
    }
    create = (e) =>{
      e.preventDefault();
      
      let skillArr = this.state.pet.skills;
      if(skillArr.length>0){
        skillArr= [];
      }
      if(this.state.skill1.length>3){
        skillArr.push(this.state.skill1);
      }
      if(this.state.skill2.length>3){
        skillArr.push(this.state.skill2);
      }
      if(this.state.skill3.length>3){
        skillArr.push(this.state.skill3);
      }
      this.setState({pet: {...this.state.pet, skills: skillArr}});
      console.log(this.state.pet);
      axios.post("/pets", this.state.pet)
        .then(res =>{
          if(res.data.errors){
            this.setState({errors: res.data.errors.errors});
          }else{
            this.props.history.push("/");
          }
        }).catch(err => {
          console.log(err);
        })
    }
    render (){
        return (
            <div>
              <h2>Know of a Pet in need of a good home?</h2>
              <fieldset>
                  <legend>Add a Pet</legend>
                  <form onSubmit={this.create}>
                    <p>Pet Name:&nbsp;
                      <input type = "text" onChange={this.setName}/>
                      {
                              (this.state.errors.name) ? 
                              <span className="error">&nbsp;{this.state.errors.name.message}</span> :
                              <span></span>
                          }
                    </p>
                    <p>Pet Type:&nbsp;
                      <input type = "text" onChange={this.setType}/>
                      {
                              (this.state.errors.type) ? 
                              <span className="error">&nbsp;{this.state.errors.type.message}</span> :
                              <span></span>
                          }
                    </p>
                    <p>Description:&nbsp;
                      <input type = "text" onChange={this.setDesc}/>
                      {
                              (this.state.errors.description) ? 
                              <span className="error">&nbsp;{this.state.errors.description.message}</span> :
                              <span></span>
                          }
                    </p>
                    <ul>Skills: (optional)
                          <li>
                            Skill 1:&nbsp;<input type="text" onChange={this.setSkill1}/>
                          </li>
                          <li>
                            Skill 2:&nbsp;<input type="text" onChange={this.setSkill2}/>
                          </li>
                          <li>
                            Skill 3:&nbsp;<input type="text" onChange={this.setSkill3}/>
                          </li>
                    </ul>
                    <button type= "submit" >Add Pet</button>&nbsp;<Link to="/"><button>Cancel</button></Link>
                  
                  </form>
              </fieldset>
            </div>
        )
    }
}
export default addpetform;