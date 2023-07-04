const mongoose = require("mongoose");

//Lo puse para que me reconozca la variable de entorno
require("dotenv").config({ path: ".env" });

//Conexión a la base de datos
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión con la base de datos establecida"))
  .catch((err) =>
    console.log("Imposible conectar con la base de datos: ", err)
  );

