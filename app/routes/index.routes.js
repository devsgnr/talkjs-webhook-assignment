const express = require("express");
const router = express.Router();

//Import Controller
const indexController = require("../controller/index.controller");

router.post("/talkjs", indexController.markConversationAsAnswered);

module.exports = router;
