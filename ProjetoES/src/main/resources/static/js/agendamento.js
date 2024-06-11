document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#formulario");

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        agendarConsulta();
    });
});

function agendarConsulta() {
    const paciente = {
        nomePaciente: document.getElementById("nomePaciente").value,
        email: document.getElementById("email").value,
        especialidade: document.getElementById("especialidade").value,
        dataHoraAgendamento: document.getElementById("dataHoraAgendamento").value,
        clinica: document.getElementById("clinica").value
    };

    if (!paciente.nomePaciente || !paciente.email || !paciente.especialidade || !paciente.dataHoraAgendamento || !paciente.clinica) {
        exibirMensagemErro("Por favor, preencha todos os campos.");
        return;
    }

    fetch("/agendamento", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Erro ao agendar a consulta. Por favor, tente novamente.');
        }
        return response.json();
    })
    .then(function(data) {
        console.log("Agendamento realizado com sucesso:", data);
        exibirMensagemSucesso("Agendamento da consulta feito com sucesso.");
        limparFormulario();
        $('#agendarConsultaModal').modal('hide');
    })
    .catch(function(error) {
        console.error("Erro ao agendar consulta:", error);
        exibirMensagemErro(error.message);
    });
}

function limparFormulario() {
    document.getElementById("formulario").reset();
}

function exibirMensagemSucesso(mensagem) {
    const mensagemSucesso = document.querySelector(".mensagem-sucesso");
    if (mensagemSucesso) {
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.style.display = "block";
        setTimeout(function() {
            mensagemSucesso.style.display = "none";
            window.location.href = '/';
        }, 5000);
    }
}

function exibirMensagemErro(mensagem) {
    const mensagemErro = document.querySelector(".mensagem-erro");
    if (mensagemErro) {
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = "block";
    }
}
