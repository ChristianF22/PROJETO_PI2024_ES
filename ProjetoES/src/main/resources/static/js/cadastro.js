document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#cadastro form");
    const mensagemSucesso = document.querySelector("#cadastro .mensagem-sucesso");
    const Ilogin = document.querySelector("#cadastro #login");
    const Inome = document.querySelector("#cadastro #nome");
    const Isenha = document.querySelector("#cadastro #senha");
    const Idata = document.querySelector("#cadastro #data_nascimento");

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = {
            login: Ilogin.value,
            nome: Inome.value,
            senha: Isenha.value,
            dataNascimento: new Date(Idata.value).toISOString().split('T')[0],
            ativo: true,
            dataCadastro: new Date().toISOString()
        };

        cadastrarUsuario(usuario); 
    });

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
                if (mensagemSucesso) {
                    mensagemSucesso.style.display = "none";
                    $('#cadastro').modal('hide'); 
                }
            }, 2000); 
        })
        .catch(function (error) {
            exibirMensagemErro("Erro ao cadastrar usuário. Por favor, tente novamente.");
            console.error(error);
        });
    }

    function exibirMensagemSucesso(mensagem) {
        const mensagemSucesso = document.querySelector('.mensagem-sucesso');
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.classList.remove('alert-danger');
        mensagemSucesso.classList.add('alert', 'alert-success');
        mensagemSucesso.style.display = 'block';
    }

    function exibirMensagemErro(mensagem) {
        if (mensagemSucesso) {
            mensagemSucesso.textContent = mensagem;
            mensagemSucesso.classList.remove('sucesso');
            mensagemSucesso.classList.add('erro');
            mensagemSucesso.style.display = "block";
        }
    }
});
