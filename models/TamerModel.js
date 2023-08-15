const mongoose = require("mongoose")

const tamerSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true, "Please add a tamer's name"]
    },
    level:{
        type:Number,
        default:0
    },
    digimons:[{
        type:mongoose.Types.ObjectId,
        ref:"HatchedDigimon"
    }]
},
{timeStamp:true},
);


module.exports = mongoose.model("Tamer", tamerSchema);