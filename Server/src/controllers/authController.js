const modelUser = require("../models/modelsIndex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

//Crear usuario

const createNewUser = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 12);
  try {
    const user = {
      name: req.body.name,
      surnames: req.body.surnames,
      email: req.body.email,
      password: hash,
    };

    const modelUserInstance = new userModel(user);
    await modelUserInstance.validate();

    if (!(name && surnames && email && password)) {
      res.status(400).send("Todos los campos son requeridos");
    }

    const emailExiste = await modelUser.findOne({ email: user.email });

    if (emailExiste) {
      return res
        .status(400)
        .send({ message: "El correo electrónico ya existe" });
    }
    if (req.body.password.length < 8) {
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
