const router = require("express").Router(); 


//Ruta crear usuario
router.post('/users', (req, res)=> {
    res.send("Create User")
})



module.exports = router;