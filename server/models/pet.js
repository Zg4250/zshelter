const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name:{
        type: String, required: [true, "Please Enter an Animal"],
    minlength: [3, "Name has to be at least three characters"]
},
    type:{
        type: String, required: [true, "Please Enter the Type of Animal"],
    minlength: [3, "Type hast to be at least three characters"]
},
    likes:{
        type: Number, default: 0
},
    description:{
        type: String, required: [true, "Please Enter a Description of the Animal"],
    minlength: [3, "Name has to be at least three characters"]
},
    skills: [String]
}, {timestamps: true}

);

mongoose.model("pet", petSchema);