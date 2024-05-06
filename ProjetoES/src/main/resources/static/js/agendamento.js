const formulario = document.querySelector("form");

function agendarConsulta(event) {
    event.preventDefault();
    
    const Inome = document.getElementById("nomePaciente");
    const Iemail = document.getElementById("email");
    const Iclinica = document.getElementById("clinica");
    const Imedico = document.getElementById("medico");
    const Idatahora = document.getElementById("dataHoraAgendamento");
    const Istatus = document.getElementById("status");
    const Imedico_id = document.getElementById("medico_id");

    const paciente = {
        nomePaciente: Inome.value,
        email: Iemail.value,
        clinica: Iclinica.value,
        medico: Imedico.value,
        dataHoraAgendamento: Idatahora.value,
        status: Istatus.value,
        medico_id: Imedico_id.value
    };

    fetch("http://localhost:8080/agendamento", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao agendar a consulta. Por favor, tente novamente.');
        }
        exibirMensagemSucesso("Agendamento da consulta feita com sucesso.");
        limparFormulario();
    })
    .catch(error => {
        exibirMensagemErro(error.message);
    });
}

function exibirMensagemSucesso(mensagem) {
    const mensagemSucesso = document.querySelector(".mensagem-sucesso");
    if (mensagemSucesso) {
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.style.display = "block";
        setTimeout(() => {
            mensagemSucesso.style.display = "none";
            window.location.href = '/agendamento';
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

formulario.addEventListener('submit', (event) => {
    agendarConsulta(event);
});

function limparFormulario() {
    document.getElementById("nomePaciente").value = "";
    document.getElementById("email").value = "";
    document.getElementById("clinica").value = "";
    document.getElementById("medico").value = "";
    document.getElementById("dataHoraAgendamento").value = "";
    document.getElementById("status").value = "";
    document.getElementById("medico_id").value = "";
}
