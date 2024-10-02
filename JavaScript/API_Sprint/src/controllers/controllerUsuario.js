let usuarios = [];
let id = 0;

module.exports = class controllerUsuario {
  static async cadastraUsua(req, res) {
    const { nome, email, emailc, senha, senhac } = req.body;

    if (!nome || !email || !emailc || !senha || !senhac) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    if (email !== emailc) {
      return res
        .status(400)
        .json({ message: "Digite o mesmo email nos dois campos de email!" });
    }

    if (senha !== senhac) {
      return res
        .status(400)
        .json({ message: "Digite a mesma senha nos dois campos de senha!" });
    }

    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ message: "O email deve ter '@' no final." });
    }

    const existeUsua = usuarios.find((user) => user.email === email);
    if (existeUsua) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    id++;

    const newUser = { id, nome, email, senha,};
    usuarios.push(newUser);

    return res
      .status(200)
      .json({ message: "Seu cadastro foi executado com sucesso!" });
  }

  static async loginUsua(req, res) {
    const { email, senha } = req.body;

    if (email !== usuarios["email"]) {
      return res
        .status(400)
        .json({
          message: "O email deve ser registrado. Tente fazer cadastro!",
        });
    }
    if (senha !== usuarios["senha"]) {
      return res
        .status(400)
        .json({
          message: "A senha deve ser registrada. Tente fazer cadastro!",
        });
    }

    return res
      .status(200)
      .json({
        message: "Login efetuado com sucesso. Redirecionando à tela inicial...",
      });
  }

  static async mostraUsua(req, res) {
    return res
      .status(200)
      .json({ message: "Mostrando todos os usuários:", usuarios });
  }

  static async atualizaUsua(req, res) {
    const { id, nome, email, senha } = req.body;

    if (!id || !nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    //Procurar o indice do usuario no Array 'usuarios' pelo email
    const userIndex = usuarios.findIndex((user) => user.id === id);
    //Se o usuario não for encontrado userIndex se torna -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    usuarios[userIndex] = { id, nome, email, senha };
    return res
      .status(200)
      .json({ message: "Usuário atualizado", user: usuarios[userIndex] });
  }

  static async removeUsua(req, res){
    //Obtem o parametro Id da requisição, que é o cpf do user a ser deletado
    const userId = req.params.id;

    //Procurar o indice do usuario no Array 'usuarios' pelo parametro(cpf)
    const userDeleted = usuarios.findIndex((user) => user.id == userId);
    //Se o usuario não for encontrado userDeleted se torna -1
    if (userDeleted === -1) {
      return res
        .status(400)
        .json({ error: "Usuário não encontrado" });
    }

    //Removendo o usuario do Array 'usuarios'
    usuarios.splice(userDeleted, 1);

    return res
        .status(200)
        .json({message:"Usuário deletado com sucesso"});
  }
};
