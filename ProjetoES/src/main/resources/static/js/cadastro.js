document.addEventListener("DOMContentLoaded", function() {
    carregarUsuarios(); // Chama a função para carregar os usuários ao carregar a página

    // Adiciona um listener para o formulário de cadastro de usuário
    const formulario = document.querySelector("form");
    const Ilogin = document.querySelector(".login");
    const Inome = document.querySelector(".nome");
    const Isenha = document.querySelector(".senha");
    const Idata = document.querySelector(".data_nascimento");
    const mensagemSucesso = document.querySelector(".mensagem-sucesso");

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        const usuario = {
            login: Ilogin.value,
            nome: Inome.value,
            senha: Isenha.value,
            dataNascimento: new Date(Idata.value).toISOString().split('T')[0],
            ativo: true,
            dataCadastro: new Date().toISOString()
        };

        cadastrarUsuario(usuario); // Chama a função para cadastrar o usuário
        limparFormulario(); // Limpa o formulário após cadastrar o usuário
    });

    // Função para cadastrar um usuário
    function cadastrarUsuario(usuario) {
        fetch("http://localhost:8080/api/usuarios", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(usuario)
        })
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Erro ao cadastrar usuário.');
            }
            return res.json();
        })
        .then(function (data) {
            exibirMensagemSucesso("Usuário cadastrado com sucesso.");
            setTimeout(function() {
                mensagemSucesso.style.display = "none";
                window.location.href = '/';
            }, 2000);
        })
        .catch(function (error) {
            exibirMensagemErro("Erro ao cadastrar usuário. Por favor, tente novamente.");
            console.error(error);
        });
    }

    // Função para exibir mensagem de sucesso
    function exibirMensagemSucesso(mensagem) {
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.classList.remove('erro'); // Remove a classe de erro, se houver
        mensagemSucesso.classList.add('sucesso');
        mensagemSucesso.style.display = "block";
    }

    // Função para exibir mensagem de erro
    function exibirMensagemErro(mensagem) {
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.classList.remove('sucesso'); // Remove a classe de sucesso, se houver
        mensagemSucesso.classList.add('erro');
        mensagemSucesso.style.display = "block";
    }

    // Função para limpar o formulário após o cadastro
    function limparFormulario() {
        Ilogin.value = '';
        Inome.value = '';
        Isenha.value = '';
        Idata.value = '';
    }

    // Função para carregar os usuários
    function carregarUsuarios() {
        fetch('/api/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar usuários.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuários carregados:', data);
            document.getElementById("patientId").value = data.id;
            document.getElementById("document").value = data.documento;
            document.getElementById("sex").value = data.sexo;
            document.getElementById("birthdate").value = data.dataNascimento;
            document.getElementById("name").value = data.nome;
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
            alert('Erro ao carregar usuários. Verifique o console para mais detalhes.');
        });
    }
});
