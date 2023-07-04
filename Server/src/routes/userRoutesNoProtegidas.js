const router = require("express").Router(); 


//Ruta crear usuario
router.post('/crearUsuario', (req, res)=> {
    res.send("Create User")
})



module.exports = router;