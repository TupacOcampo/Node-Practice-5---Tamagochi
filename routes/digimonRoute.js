const express = require("express");
const digimonRouter = express.Router();

const { getDigimons, getDigimonById, addDigimon, deleteDigimon } = require("../controllers/digimonController");

digimonRouter.route("/")
    .get(getDigimons)
    .post(addDigimon)

digimonRouter.route("/:id")
    .get(getDigimonById)
    .delete(deleteDigimon)

module.exports = digimonRouter