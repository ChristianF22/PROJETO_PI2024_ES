const formulario = document.querySelector("form");

function buscarMedicos() {
    fetch("http://localhost:8080/api/medicos")
        .then(response => response.json())
        .then(data => {
            const selectMedico = document.getElementById("medicoSelecao");
            selectMedico.innerHTML = "";
            data.forEach(medico => {
                const option = document.createElement("option");
                option.value = medico.id;
                option.textContent = `${medico.nome} (${medico.especialidade})`;
                selectMedico.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar médicos:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    buscarMedicos();
});

function agendarConsulta(event) {
    event.preventDefault();

    const nomePaciente = document.getElementById("nomePaciente").value;
    const email = document.getElementById("email").value;
    const medicoId = document.getElementById("medicoSelecao").value;
    const dataHoraAgendamento = document.getElementById("dataHoraAgendamento").value;
    const status = document.getElementById("status").value;

    const paciente = {
        nomePaciente: nomePaciente,
        email: email,
        medicoId: medicoId,
        dataHoraAgendamento: dataHoraAgendamento,
        status: status
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

formulario.addEventListener('submit', (event) => {
    agendarConsulta(event);
});

function limparFormulario() {
    document.getElementById("nomePaciente").value = "";
    document.getElementById("email").value = "";
    document.getElementById("medicoSelecao").value = "";
    document.getElementById("dataHoraAgendamento").value = "";
    document.getElementById("status").value = "";
}

function exibirMensagemSucesso(mensagem) {
    const mensagemSucesso = document.querySelector(".mensagem-sucesso");
    if (mensagemSucesso) {
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.style.display = "block";
        setTimeout(() => {
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
