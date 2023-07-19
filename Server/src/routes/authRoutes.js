// //Ruta crear usuario
const {createNewUser, loginUser}  = require("../controllers/indexControllers");
const authRoutes = require("express").Router();

//Ruta crear usuario
authRoutes.post("/registro", createNewUser);

//Ruta login usuario
authRoutes.post("/login",loginUser)



module.exports = authRoutes;
