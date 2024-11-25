document
    .addEventListener("DOMContentLoaded", getAllSalas)


function getAllSalas() {
    fetch("http://10.89.240.69:3306/reservas-senai/v1/sala/", {
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
          const salalist = document.getElementById("listSala")
          salalist.innerHTML = "";
  
          data.salas.forEach((sala) =>{
            const listItem = document.createElement("li")
            listItem.textContent = `Nome: ${sala.name}, CPF: ${sala.cpf}, Email: ${sala.email}`
            salalist.appendChild(listItem)
            const reservaButt = document.createElement("button")
            reservaButt.onclick = `window.location.href='index.html'`
            salalist.appendChild(reservaButt)
          })
        })
        .catch((error) =>{
          alert("Erro ao obter salas: " + error.message)
          console.log("Erro: ", error.message)
        })
  }