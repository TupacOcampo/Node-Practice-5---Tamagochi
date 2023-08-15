const express = require("express")
const hatchedDigimonRouter = express.Router({mergeParams:true});

const { getTamerHatchedDigimons, addHatchedDigimon } = require("../controllers/hatchedDigimonController");

hatchedDigimonRouter
    .route("/")
    .get(getTamerHatchedDigimons)
    .post(addHatchedDigimon)

module.exports = hatchedDigimonRouter;