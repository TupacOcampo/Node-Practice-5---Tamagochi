const asyncHandler = require("express-async-handler");
const Digimon = require("../models/DigimonModel");
const HatchedDigimon = require("../models/hatchedDigimonModel")

//@Desc      Get all Digimon models
//@Route     GET /api/v1/digimon
//@Access    Public
const getDigimons = asyncHandler(async(req, res)=> {
    const digimons = await Digimon.find();
    if (!digimons){
        res.status(404).json({status:"error"});
    }

    res.status(200).json({"Status":"Success", "Count": digimons.length, "Digimons":digimons});
});

//@Desc      Find Digimon by id
//@Route     GET /api/v1/digimon/:id
//@Access    Public
const getDigimonById = asyncHandler(async(req, res) => {
    const foundDigimon = await Digimon.findById(req.params.id);
    if (!foundDigimon){
        res.status(404).json({status:"error"});
    }
    res.status(200).json({"Status":"Success", "Digimon":foundDigimon});
});

//@Desc      Add new Digimon model
//@Route     POST /api/v1/digimon
//@Access    Public
const addDigimon = asyncHandler(async(req, res) => {
    const {name, type, description, attack, defense} = req.body;

    if (!name || !type || !description){
        res.status(400).send("Please send all the fields required");
    }

    const addedDigimon = await Digimon.create({name, type, description, attack, defense});
    res.status(201).json({status:"Success", "Digimon": addedDigimon});
});

//@Desc      Delete Digimon by id
//@Route     DELETE /api/v1/digimon
//@Access    Public
const deleteDigimon = asyncHandler(async(req, res) => {
    const foundDigimon = await Digimon.findById(req.params.id);
    if (!foundDigimon){
        res.status(404).json({"Status":"Error", "Message":`No digimon with the id ${req.params.id}`})
    }
    foundDigimon.deleteOne();
    res.status(200).json({"Status":"Success"});
});

module.exports = { getDigimons, getDigimonById, addDigimon, deleteDigimon };
