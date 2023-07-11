const mongoose = require("mongoose");
const uuid = require("uuid");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4(),
    },

    name: {
      type: String,
      required: [true, "El nombre del usuario es obligatorio"],
      minlength: [1, "El nombre del usuario debe ser superior a 1 caracter"],
      maxlength: [
        30,
        "El nombre del usuario no debe ser superior a 30 caracteres",
      ],
      validate: {
        validator: function (value) {
          return value.length > 1 && value.length < 30;
        },
        message:
          "El nombre del usuario debe tener mas de 1 caracter y menos de 30",
      },
    },

    surnames: {
      type: String,
      required: [true, "El apellido  del usuario es obligatorio"],
      minlength: [1, "El apellido del usuario debe ser superior a 1 caracter"],
      maxlength: [50, "El apellido no puede exceder los 50 caracteres"],
      validate: {
        validator: function (value) {
          return value.length > 1 && value.length < 50;
        },
        message:
          "El apellido del usuario debe tener mas de 1 caracter y menos de 50",
      },
    },
    //El trim: true sirve para eliminar los espacios en blanco, incluido el valor nulo, o los caracteres especificados al principio
    // y al final de una cadena.
    //Para realizar una validación en tu campo email usando una expresión regular (así como en cualquier otro campo
    //en el que requieras expresiones regulares),
    //puedes usar el validador incorporado de Mongoose: match.//

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "El correo electrónico es obligatorio"],
      validate: [
        {
          validator: function (value) {
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return emailRegex.test(value);
          },
          message: "Por favor, proporciona un correo electrónico válido",
        },
      ],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, proporciona un correo electrónico válido",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [8, "La contraseña debe tener minimo 8 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
