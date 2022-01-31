const express = require("express");
const router = express.Router();
const healthcheck = require("./healthcheck");
const colors = require("./colors");

// Modify the router object and then export it!
// Beautiful approach btw

router.use("/healthcheck", healthcheck);
router.use("/colors", colors);

module.exports = router;
