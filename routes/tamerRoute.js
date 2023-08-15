const express = require("express");
const tamerRoute = express.Router();
const hatchedDigimonRouter = require("./hatchedDigimonRoutes");

const { getAllTamers, getTamerById, addNewTamer } = require("../controllers/tamerController")

tamerRoute.use('/:id/digimon', hatchedDigimonRouter);

tamerRoute.route("/")
    .get(getAllTamers)
    .post(addNewTamer)

tamerRoute.route("/:id")
    .get(getTamerById)

module.exports = tamerRoute;