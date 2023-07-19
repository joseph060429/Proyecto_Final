// //Ruta crear usuario
const createNewUser  = require("../controllers/indexControllers");
const authRoutes = require("express").Router();

// //Ruta crear usuario
authRoutes.post("/registro", createNewUser);


module.exports = authRoutes;
