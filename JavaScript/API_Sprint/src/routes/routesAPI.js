const router = require('express').Router();

const controllerUsuario = require("../controllers/controllerUsuario.js");

router.post("/cadastro/", controllerUsuario.cadastroUsua);
router.post("/login/", controllerUsuario.loginUsua);

module.exports = router;