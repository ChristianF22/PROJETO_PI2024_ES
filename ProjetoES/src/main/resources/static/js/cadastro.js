const formulario = document.querySelector("form");
const Ilogin = document.querySelector(".login");
const Inome = document.querySelector(".nome");
const Isenha = document.querySelector(".senha");
const Idata = document.querySelector(".data_nascimento");
const mensagemSucesso = document.querySelector(".mensagem-sucesso");

function cadastrarUsuario() {
   
    const dataNascimento = new Date(Idata.value);
    const dataFormatada = dataNascimento.toISOString().split('T')[0];

    
    const usuario = {
        login: Ilogin.value,
        nome: Inome.value,
        senha: Isenha.value,
        dataNascimento: dataFormatada,
        ativo: true,
        dataCadastro: new Date().toISOString()
    };

    fetch("http://localhost:8080/api/usuarios", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(usuario)
    })
    .then(function (res) {
        exibirMensagemSucesso("Usuário cadastrado com sucesso.");
        setTimeout(function() {
            mensagemSucesso.style.display = "none";
            window.location.href = '/';
        }, 2000);
    })
    .catch(function (error) {
        exibirMensagemErro("Erro ao cadastrar usuário. Por favor, tente novamente.");
        console.log(error);
    });
}

formulario.addEventListener('submit', event => {
    event.preventDefault();
    cadastrarUsuario();
    limparFormulario();
});

function exibirMensagemSucesso(mensagem) {
    mensagemSucesso.textContent = mensagem;
    mensagemSucesso.classList.add('sucesso');
    mensagemSucesso.style.display = "block";
}

function exibirMensagemErro(mensagem) {
    mensagemSucesso.textContent = mensagem;
    mensagemSucesso.classList.add('erro'); 
    mensagemSucesso.style.display = "block";
}

function limparFormulario() {
    Ilogin.value = '';
    Inome.value = '';
    Isenha.value = '';
    Idata.value = '';
}
