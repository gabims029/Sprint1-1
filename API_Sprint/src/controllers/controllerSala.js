const connect = require("../db/connect");

module.exports = class controllerSala {
    static async cadastraSala(req, res) {
      const { nome_sala, descricao, bloco, categoria, andar } = req.body;

      if (!nome_sala || !descricao || !bloco || !categoria || !andar) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
      }
    }
}