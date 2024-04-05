const formulario = document.querySelector("form");
const Ilogin = document.querySelector(".login");
const Inome = document.querySelector(".nome");
const Isenha = document.querySelector(".senha");
const Idata = document.querySelector(".data_nascimento");

function cadastro(){
    
    fetch("http://localhost:8080/usuarios", {
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

            method: "POST",
            body: JSON.stringify({
            login: Ilogin.value,
            nome: Inome.value,
            senha: Isenha.value,
            data_nascimento: Idata.value

        })
    })
    .then(function (res) {console.log(res)})
    .catch(function (res) {console.log(res)})

    console.log("Funcionou")
}

function limpar(){
    Ilogin.value = "",
    Inome.value = "",
    Isenha.value = "",
    Idata.value = ""
};

formulario.addEventListener('submit', function (event){
    event.preventDefault();

    cadastro();
    limpar();
});