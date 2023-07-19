const jwt = require("jsonwebtoken");
require("dotenv").config({path: ".env"});

const verificarToken = (req, res, next) => {
    try{
        const autenticacion = req.header("Authorization");
        if(!autenticacion){
            return res.status(401).json({ error: "Acceso denegado"})
        }
        const token = autenticacion.split(' ')[1].trim().replace(/^"(.*)"$/, '$1');
        const verificado = jwt.verify(token, process.env.SECRET)
        req.user = verificado;
        next();
        return req.user;
        
    } catch(error) {
        if(error.name === 'TokenExpiredError'){
            res.status(401).json({ error: 'Sesion expirada. Vuelve a iniciar sesión'})
        }
    }

}

module.exports = verificarToken;