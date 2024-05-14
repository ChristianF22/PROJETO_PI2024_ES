document.addEventListener("DOMContentLoaded", function () {
    function limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("especialidade").value = "";
        document.getElementById("crm").value = "";
    }

    function exibirMensagemSucesso() {
        const mensagem = document.getElementById("mensagemSucesso");
        mensagem.innerHTML = "Médico cadastrado com sucesso!";
        mensagem.classList.add("alert", "alert-success");
        mensagem.style.display = "block";

        setTimeout(function () {
            mensagem.style.display = "none";
            mensagem.classList.remove("alert", "alert-success");
        }, 3000);
    }

    document.getElementById("btnCadastrar").addEventListener("click", function () {
        const nome = document.getElementById("nome").value;
        const especialidade = document.getElementById("especialidade").value;
        const crm = document.getElementById("crm").value;

        const medico = {
            nome: nome,
            especialidade: especialidade,
            crm: crm
        };

        fetch("http://localhost:8080/api/medicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medico)
        })
        .then(response => {
            if (response.ok) {
                exibirMensagemSucesso();
                limparCampos(); 
                $('#ExemploModalCentralizado').modal('hide');
            } else {
                throw new Error("Erro ao cadastrar médico.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar médico. Por favor, tente novamente.");
        });
    });
});
