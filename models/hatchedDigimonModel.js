const mongoose = require("mongoose")

const hatchedDigimonSchema = mongoose.Schema({
    tamer:{
        type:mongoose.Types.ObjectId,
        ref:"Tamer",
        required:[true, "Please add a Tamer"]
    },
    digimon:{
        type:mongoose.Types.ObjectId,
        ref:"Digimon",
        required:[true, "Please add a Digimon"]
    },
    level:{
        type:Number,
        default:1
    },
    givenName:{
        type:String,
        required:[true, "Please add a given name for this digimon"],
        unique:true
    }
},{timeStamp:true})

module.exports = mongoose.model("HatchedDigimon", hatchedDigimonSchema);