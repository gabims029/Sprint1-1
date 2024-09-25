let usuarios = [];

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

    if (!email.includes("@docente.senai.br")) {
      return res
        .status(400)
        .json({ message: "O email deve ter '@docente.senai.br' no final." });
    }


    const newUser = { nome, email, senha,};
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
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    //Procurar o indice do usuario no Array 'usuarios' pelo email
    const userIndex = usuarios.findIndex((user) => user.email === email);
    //Se o usuario não for encontrado userIndex se torna -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    usuarios[userIndex] = { nome, email, senha };
    return res
      .status(200)
      .json({ message: "Usuário atualizado", user: usuarios[userIndex] });
  }

  static async removeUsua(req, res){
    const {userId} = req.params.email;
    const userDeleted = usuarios.findIndex((user) => user.email === userId);
    if (userDeleted === -1) {
      return res
        .status(400)
        .json({ error: "Usuário não encontrado" });
    }
    usuarios.splice(userDeleted, 1);
    return res
        .status(200)
        .json({message:"Usuário deletado com sucesso"});
  }
};
