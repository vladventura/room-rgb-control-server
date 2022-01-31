const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is alive and kicking",
    code: 0,
  });
});

module.exports = router;
