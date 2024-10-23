const router = require('express').Router();

const controllerUsuario = require("../controllers/controllerUsuario.js");

router.post("/user/cadastro", controllerUsuario.cadastraUsua);
router.post("/user/login", controllerUsuario.loginUsua);
router.get("/user/", controllerUsuario.mostraUsua);
router.put("/user/", controllerUsuario.atualizaUsua);
router.delete("/user/:id", controllerUsuario.removeUsua);

module.exports = router;
// Rota base em http://localhost:5000/reservas-senai/v1/