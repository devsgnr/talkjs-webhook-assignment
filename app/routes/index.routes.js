const express = require("express");
const router = express.Router();

//Import Controller
const indexController = require("../controller/index.controller");

router.get("/talkjs", indexController.keepServerAlive);

router.post("/talkjs", indexController.markConversation);

module.exports = router;
