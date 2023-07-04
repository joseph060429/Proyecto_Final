const express = require("express");

// me quede conectando la base de datos

//Variables de entorno
require("dotenv").config;

//Ajustes
const port = process.env.PORT || 3000;

const app = express();

//Para ver que corre el servidor
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});

//Routes
const indexRoutes = require("./routes/indexRoutes");

//Conexión a base de datos
const database = require("./database/indexDb");

module.exports = app;
