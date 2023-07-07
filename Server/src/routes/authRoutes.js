const express = require('express');
const authRouter = express.Router();
const  authController = require ("../controllers/authController")


//Ruta crear usuario
authRouter.post('/registro', authController.createNewUser)




module.exports = authRouter;