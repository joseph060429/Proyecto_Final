const modelUser = require("../models/modelUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

//Crear usuario

const createNewUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      surnames: req.body.surnames,
      email: req.body.email,
      password: req.body.password,
    };

    const modelUserInstance = new modelUser(user);
    await modelUserInstance.validate();

    if (
      !(
        req.body.name &&
        req.body.surnames &&
        req.body.email &&
        req.body.password
      )
    ) {
      res.status(400).send("Todos los campos son requeridos");
    }

    const emailExiste = await modelUser.findOne({ email: email });

    if (emailExiste) {
      return res
        .status(400)
        .send({ message: "El correo electrónico ya existe" });
    }
    const contraseñaEncriptada = await bcrypt.hash(password, 10);

    if (contraseñaEncriptada < 8) {
      return res
        .status(400)
        .send({ message: "La contraseña debe tener al menos 8 caracteres" });
    }

    await modelUser.create(user);

    return res
      .status(200)
      .send({ message: "El usuario se ha creado correctamente" });
  } catch (err) {
    if (err.name === "ValidacionError") {
      const validacionErrores = Object.values(err.errores).map(
        (error) => error.message
      );
      return res.status(400).json({ message: validacionErrores });
    }
    console.log(err);
    return res.status(500).json({
      message: "Ha ocurrido un error al crear el usuario",
    });
  }
};

module.exports = createNewUser;
