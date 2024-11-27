document
    .addEventListener("DOMContentLoaded", getAllSalas)


function getAllSalas() {
    fetch("http://10.89.240.79:5000/reservas-senai/v1/sala/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      return response.json().then((err) =>{
        throw new Error(err.error);
      });
    })
        .then((data) =>{
          const salalist = document.getElementById("listSalas")
          salalist.innerHTML = " ";
  
          data.salas.forEach((sala) =>{
            const listItem = document.createElement("li")
            listItem.textContent = `Nome: ${sala.nomesala}, Descrição: ${sala.descricao}, Categoria: ${sala.categoria}`
            salalist.appendChild(listItem)
            const reservaButt = document.createElement("button")
            reservaButt.textContent = `Reservar`
            reservaButt.onclick = function() {
              window.location.href = "index.html";
            };
            salalist.appendChild(reservaButt)
          })
        })
        .catch((error) =>{
          alert("Erro ao obter salas: " + error.message)
          console.log("Erro: ", error.message)
        })
  }