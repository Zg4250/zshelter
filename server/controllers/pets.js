const mongoose = require("mongoose");
const pet = mongoose.model("pet");

class pets{
    getAll(req, res){
        pet.find({}, (err, pets)=>{
            if(err){
                console.log(err);
            }
            res.json({status: "ok", pets: pets});
        });
    }
    getOne(req, res){
        pet.findOne( { _id: req.params._id}, (err, pet) => {
            if(err){
                console.log(err);
            }
            res.json({status:"ok", pet: pet});
        })
    }
    create(req, res){
        let Pet = pet(req.body);
        Pet.save( (err)=> {
            if(err){
                res.json({status: "not ok", valid: false, errors: err});
            }else{
                res.json({staus:"ok", valid: true});
            }
        });
    }
    delete(req, res){
        pet.deleteOne({_id: req.params._id}, (err)=>{
            if(err){
                console.log(err);
            }
            res.json({status:"ok"})
        });
    }
    update(req, res){
        pet.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true}, err =>{
            if(err){
                console.log(err);
            }
            res.json({status:"ok"})
        });
    }
}
module.exports = new pets();