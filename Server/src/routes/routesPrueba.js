const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to my API Albaricoque");
});

module.exports = router;