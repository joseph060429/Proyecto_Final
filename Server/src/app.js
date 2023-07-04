const express = require("express");

//Variables de entorno
require("dotenv").config;

//Ajustes
const port = process.env.PORT || 3000;

const app = express();

//Para ver donde esta corriendo el servidor
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto ", port);
});

const router = require("express").Router();

//rutas
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//Conexión a base de datos
const database = require("./database/indexDb");

module.exports = app;
