const asyncHandler = require("express-async-handler")
const HatchedDigimon = require("../models/hatchedDigimonModel")
const Digimon = require("../models/DigimonModel");
const Tamer = require("../models/TamerModel")

//@Desc      Get tamer hatched digimons
//@Route     GET /api/v1/tamer/:id/digimon
//@Access    Public
const getTamerHatchedDigimons = asyncHandler(async(req, res)=> {

    //Check if the specified tamer exists
    const foundTamer = await Tamer.findById(req.params.id);
    if (!foundTamer){
        return res.status(404).json({"Status":"Error", "Message":`No tamer with the id ${req.params.tamerId}`})
    }

    //If there is a valid tamer id for an existing tamer, then find all the Hatched digimons for that tamer
    const digimons = await HatchedDigimon.find({tamer:foundTamer.id}).populate("digimon");
    res.status(201).json({status:"Success", count:digimons.length, "Digimons": digimons});
})

//@Desc      Add tamer hatched digimon
//@Route     POST /api/v1/tamer/:id/digimon
//@Access    Public
const addHatchedDigimon = asyncHandler(async(req, res)=> {
    const { digimonName, givenName } =  req.body;

    //Search digimon by name
    const foundDigimon = await Digimon.findOne({name:digimonName});
    //Check if that Digimon exists
    if (!foundDigimon){
        return res.status(404).json({status:"Error", message:`Digimon with name ${digimonName} doesnt exist`})
    }

    const foundTamer = await Tamer.findById(req.params.id);
    if (!foundTamer){
        return res.status(404).json({status:"Error", message:`No tamer with id ${req.params.id} was found`})
    }

    //If both Tamer and Digimon exist, create and save it to database
    const newlyHatchedDigimon = await HatchedDigimon.create({
        tamer:req.params.id,
        digimon:foundDigimon.id,
        givenName:givenName
    });

    const updatedTamer = await Tamer.findByIdAndUpdate(req.params.id, {"$push": {digimons: newlyHatchedDigimon}})

    res.status(200).json({status:"success", digimon:newlyHatchedDigimon});
})

module.exports = { getTamerHatchedDigimons, addHatchedDigimon }
