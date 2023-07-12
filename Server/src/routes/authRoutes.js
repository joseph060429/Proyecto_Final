

// //Ruta crear usuario
const createNewUser  = require("../controllers/indexController");
const authRoutes = require("express").Router();

// //Ruta crear usuario
authRoutes.post("/registro", createNewUser);


module.exports = authRoutes;
