const express = require("express");
const bodyParser = require ("body-parser")
const authRoutes = require("./routes/indexRoutes");

//Variables de entorno
require("dotenv").config;

//Ajustes
const port = process.env.PORT || 3000;

const app = express();

//Para ver donde esta corriendo el servidorrs
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto ", port);
});

//Capturar bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

//Rutas no protegidas son crear y loguear el usuario//
app.use("/api", authRoutes) //Crear usuario y Login//



//Conexión a base de datos
const database = require("./database/indexDb");


module.exports = app;
