const modelUser = require("../models/modelsIndex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const verificarToken = require("../middleware/validateToken")
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

    const modelUserInstance = new modelUser(user);
    await modelUserInstance.validate();

    const emailExiste = await modelUser.findOne({ email: user.email });

    if (emailExiste) {
      return res
        .status(400)
        .send({ message: "El correo electrónico ya existe" });
    }
    const contraseñaEncriptada = await bcrypt.hash(user.password, 10);

    if (user.password < 8) {
      return res
        .status(400)
        .send({ message: "La contraseña debe tener al menos 8 caracteres" });
    }
    //antes de crear el usuario encripto la contraseña
    user.password = contraseñaEncriptada;

    //aqui creo el usuario
    await modelUser.create(user);

    //Creo el token
    const token = jwt.sign({ email: user.email }, process.env.SECRET, {
      expiresIn: "1H",
    });

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

//Login del usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Valido los campos
    if (!(email && password)) {
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Buscar el email del usuario en la base de datos
    const user = await modelUser.findOne({ where: { email: email } });
    //Si el usuario existe y la contraseña es igual
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      res.header("Authorization", token).json({
        error: null,
        data: { token },
      });
    }
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ error: "Usuario o contraseña incorrecta" });
  }
};

module.exports = { createNewUser, loginUser };
