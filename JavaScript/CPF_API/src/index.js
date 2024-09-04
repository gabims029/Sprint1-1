//Importa módulo express
const express = require("express");

//Defineuma classe para organizar a lógica da aplicação
class AppController {
  constructor() {
    //Cria uma nova instância do express dentro da classe
    this.express = express();
    //Chama o método middlewares para configurar os middlewares
    this.middlewares();
    //Chama o método routes para definir as rotas da API
    this.routes();
  }
  middlewares() {
    //Permitir que a aplicação recaba dados em formato JSON nas requisições
    this.express.use(express.json());
  }
  //Define as rotas da nossa API
  routes() {
    //Define uma rota GET para o caminho health
    this.express.get("/health/", (req, res) => {
      res.send({ nome: "Gabriela", idade: "17", cpf: "43254697880"});
    });//Essa rota é usada para verificar se a API estoa OK
  }
}
//Exportando a instância de Express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express;
