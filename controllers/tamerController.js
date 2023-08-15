const asyncHandler = require("express-async-handler");
const Tamer = require("../models/TamerModel");

//@Desc      Get all Tamers
//@Route     GET /api/v1/tamer
//@Access    Public
const getAllTamers = asyncHandler(async(req, res)=> {
    const foundTamers = await Tamer.find().populate("digimons");;
    if (!foundTamers){
        res.status(404).json({"Status":"Error", "Message":"No tamers were found"})
    }
    res.status(200).json({"Status":"Success", "Count":foundTamers.length, "Tamers":foundTamers});
});

//@Desc      Get Tamer by id
//@Route     GET /api/v1/tamer/:id
//@Access    Public
const getTamerById = asyncHandler(async(req, res) => {
    const foundTamer = await Tamer.findById(req.params.id)
        .populate({path:"digimons", populate:{path:"digimon"}});
    if (!foundTamer){
        res.status(404).json({"Status":"Error", "Message":`No tamer with id ${req.params.id} was found`})
    }
    res.status(200).json({"Status":"Success", "Tamers":foundTamer});
})

//@Desc      Add new Tamer
//@Route     POST /api/v1/tamer/
//@Access    Public
const addNewTamer = asyncHandler(async(req, res) => {
    const addedTamer = await Tamer.create(req.body);
    if (!addedTamer){
        res.status(404).json({"Status":"Error", "Message":"There was an error during creation"});
    }
    res.status(201).json({"Status":"Success", "Tamer":addedTamer});
})

module.exports = { getAllTamers, getTamerById, addNewTamer }