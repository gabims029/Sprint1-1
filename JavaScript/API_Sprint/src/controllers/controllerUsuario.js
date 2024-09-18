let usuarios = [];

module.exports = class controllerUsuario{
    static async cadastroUsua(req, res){
        const {nome, email, emailc, senha, senhac} = req.body;

        if(email !== emailc){
            return res.status(400).json({message:"Digite o mesmo email nos dois campos!"});
        }

        if(senha !== senhac){
            return res.status(400).json({message:"Digite a mesma senha nos dois campos!"});       
        }

        if (!email.includes("@docente.senai.br")){
            return res.status(400).json({message:"O email deve ter '@docente.senai.br' no final."});
        } 

        let novoUsuario = {
            "nome" : nome,
            "email" : email,
            "senha" : senha
        }

        usuarios.push(novoUsuario);
        console.log(usuarios);
        usuarios.forEach((nome) =>{
            if(nome=="joão"){
                console.log("Achou João");
            }else{
                console.log("NN achou João");
            }
        })

        return res.status(200).json({message:"Seu cadastro foi executado com sucesso!"});
    }

    static async loginUsua(req,res){
        const {email, senha} = req.body;

        if(email !== usuarios["email"]){
            return res.status(400).json({message:"O email deve ser registrado. Tente fazer cadastro!"});
        }
        if(senha !== usuarios["senha"]){
            return res.status(400).json({message:"A senha deve ser registrada. Tente fazer cadastro!"});
        }
        
        return res.status(200).json({message:"Login efetuado com sucesso. Redirecionando à tela inicial..."})
    }
}