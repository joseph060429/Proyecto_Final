// const express = require("express");
// const authRouter = express.Router();
// // const authController = require("../controllers/authController");
// const createNewUser = require("../controllers/authController");

// //Ruta crear usuario

// module.exports = authRouter;

const createNewUser  = require("../controllers/authController");

const router = require("express").Router();

// //Ruta crear usuario

router.post("/registro", createNewUser);


module.exports = router;
