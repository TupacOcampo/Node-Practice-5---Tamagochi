const mongoose = require("mongoose");

const digimonSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, "Please enter a digimon name"],
        unique: true
    },
    type:{
        type:String,
        enum:["Data", "Virus", "Dragon", "Beast"],
        required:[true, "Please enter a valid digimon type"]
    },
    description: {
        type:String,
        required:[true, "Please add a description"]
    }, 
    attack: {
        type:Number,
        required: [true, "Please add an attack value"]
    },
    defense:{
        type:Number,
        required: [true, "Please add a defense value"]
    },
    evolution:[{
        type:mongoose.Types.ObjectId,
        ref:"Digimon"
    }]
},{timeStamp:true})

module.exports = mongoose.model("Digimon", digimonSchema);