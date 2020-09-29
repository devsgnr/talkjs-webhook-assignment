const express = require("express");
const router = express.Router();

//Import Controller
const indexController = require("../controller/index.controller");

router.get("/", indexController.retrieveAllCandidates);

router.post("/", indexController.addCandidate);

router.post("/vote", indexController.vote);

router.post("/addVoters", indexController.addVoters);

module.exports = router;
