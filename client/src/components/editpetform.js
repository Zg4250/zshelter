import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
 
class editpetform extends Component{
    constructor(props){
        super(props);
        this.state = {
            pet: {
              likes: null,
              skills: [],
                name: "",
                type: "",
                description: "",
            },
            errors: {},
            skill1: "",
            skill2: "",
            skill3: "",
        }
    }
    componentDidMount =()=>{
        axios.get(`/pets/${this.props.match.params._id}`)
          .then(res => {
            this.setState({pet: res.data.pet});
            if(this.state.pet.skills.length>0){
              this.setState({skill1: this.state.pet.skills[0]})
            }
            if(this.state.pet.skills.length>=2){
              this.setState({skill2: this.state.pet.skills[1]})
            }
            if(this.state.pet.skills.length>=3){
              this.setState({skill3: this.state.pet.skills[2]})
            }
          }).catch(err => {
            console.log(err);
          })
        
    }



    setName = (e) =>{
      this.setState({pet: {...this.state.pet, name: e.target.value}});
      console.log(this.state.pet.name);
    }
    setType = (e) =>{
      this.setState({pet: {...this.state.pet, type: e.target.value}});
    }
    setDesc = (e) =>{
      this.setState({pet: {...this.state.pet, description: e.target.value}});
    }
    changeSkill1 = (e) =>{
      this.setState({skill1: e.target.value});
    }
    changeSkill2 = (e) =>{
      this.setState({skill2: e.target.value});
    }
    changeSkill3 = (e) =>{
      this.setState({skill3: e.target.value});
    }
    update = (e) =>{
      e.preventDefault();
      
      let skillArr = this.state.pet.skills;
      console.log(skillArr);
      if(skillArr.length>0){
        skillArr= [];
      }
      
      if(this.state.skill1.length>=3){
        skillArr.push(this.state.skill1);
      }
      if(this.state.skill2.length>=3){
        skillArr.push(this.state.skill2);
      }
      if(this.state.skill3.length>=3){
        skillArr.push(this.state.skill3);
      }
      this.setState({pet: {...this.state.pet, skills: skillArr}},() =>{
        axios.put(`/pets/${this.props.match.params._id}`, this.state.pet)
        .then(res =>{
          if(res.data.errors){
            console.log(res)
            this.setState({errors: res.data.errors.errors});
          }else{
            this.props.history.push("/");
          }
        }).catch(err => {
          console.log(err);
        })
      });
      
    }
    
    render (){
        return (
            <div>
              <h2>Edit This Pet</h2>
              <fieldset>
                  <legend>Edit</legend>
                  <form onSubmit={this.update}>
                    <p>Name:&nbsp;
                      <input type = "text" onChange={this.setName} value={this.state.pet.name}/>
                      {
                              (this.state.errors.name) ? 
                              <span className="error">&nbsp;{this.state.errors.name.message}</span> :
                              <span></span>
                          }
                    </p>
                    <p>Type:&nbsp;
                      <input type = "text" onChange={this.setType} value={this.state.pet.type}/>
                      {
                              (this.state.errors.type) ? 
                              <span className="error">&nbsp;{this.state.errors.type.message}</span> :
                              <span></span>
                          }
                    </p>
                    <p>Description:&nbsp;
                      <input type = "text" onChange={this.setDesc} value={this.state.pet.description}/>
                      {
                              (this.state.errors.description) ? 
                              <span className="error">&nbsp;{this.state.errors.description.message}</span> :
                              <span></span>
                          }
                    </p>
                    <ul>Skills: (optional)
                          <li>
                            Skill 1:&nbsp;<input type="text" onChange={this.changeSkill1} 
                            defaultValue={
                              this.state.skill1}
                              />
                          </li>
                          <li>
                            Skill 2:&nbsp;<input type="text" onChange={this.changeSkill2}
                            defaultValue ={
                              this.state.skill2}
                              />
                          </li>
                          <li>
                            Skill 3:&nbsp;<input type="text" onChange={this.changeSkill3}
                            defaultValue ={
                              this.state.skill3}
                              />
                          </li>
                    </ul>
                    <button type= "submit" >Update Pet</button>&nbsp;
                    <Link to="/"><button>Cancel</button></Link>
                  
                  </form>
              </fieldset>
            </div>
        )
    }
}
export default editpetform;
