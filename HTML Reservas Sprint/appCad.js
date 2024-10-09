// Acessa o objeto "document" que representa a página html

document
  // Seleciona o elemento com o id indicado (do formulário)
  .getElementById("formCad")
  // Adiciona o ouvinte de evento (submit) para capturar o envio do formulário
  .addEventListener("submit", function (event) {
    // Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    event.preventDefault();
    // Captura os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const emailc = document.getElementById("emailc").value;
    const senha = document.getElementById("senha").value;
    const senhac = document.getElementById("senhac").value;

    // Requisição HTTP para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/senai-reservas/v1/user/cadastro/", {
      // Realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        // A requisição será em formato JSON
        "Content-Type": "application/json",
      },
      // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
      body: JSON.stringify({ nome, email, emailc, senha, senhac }),
    })
      .then((response) => {
        // Tratamento da resposta do servidor/API
        if (response.ok) {
          // Verifica se a resposta foi bem sucedida (status 2xx)
          return response.json();
        }
        // Convertendo o erro em formato json
        return response.json().then((err) => {
          // Mensagem retornada do servidor, acessada pela chave 'error'
          throw new Error(err.error);
        });
      }) // Fechamento de then(response)
      .then((data) => {
        // Executa a resposta de sucesso retorna ao usuario final

        //Exibe um alerta para o usuario final (front) com o nome do usuário que acabou de ser cadastrado
        alert("Usuário cadastrado com sucesso! " + data.user.nome);

        //Exibi um log no terminal para o desenvolvedor
        console.log("Usuario criado:", data.user);
      })
      .catch((error) => {
        // Captura qualquer erro que ocorra durante o processo de requisição/resposta

        //Exibe uma mensagem de erro no front
        alert(error.message);

        console.error("Erro:", error.message);
      });
  });
