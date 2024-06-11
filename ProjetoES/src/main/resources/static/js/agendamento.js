document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#formulario");

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        agendarConsulta();
    });
});

function agendarConsulta() {
    const nomePaciente = document.getElementById("nomePaciente").value;
    const email = document.getElementById("email").value;
    const especialidade = document.getElementById("especialidade").value;
    const dataHoraAgendamento = document.getElementById("dataHoraAgendamento").value;
    const clinica = document.getElementById("clinica").value;

    const paciente = {
        nomePaciente: nomePaciente,
        email: email,
        especialidade: especialidade,
        dataHoraAgendamento: dataHoraAgendamento,
        clinica: clinica
    };

    if (!nomePaciente || !email || !especialidade || !dataHoraAgendamento || !clinica) {
        exibirMensagemErro("Por favor, preencha todos os campos.");
        return;
    }

    fetch("http://localhost:8080/api/agendamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao agendar a consulta. Por favor, tente novamente.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Agendamento realizado com sucesso:", data);
        exibirMensagemSucesso("Agendamento da consulta feito com sucesso.");
        limparFormulario();
        $('#agendarConsultaModal').modal('hide');
    })
    .catch(error => {
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
