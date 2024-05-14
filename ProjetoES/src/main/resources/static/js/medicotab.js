document.addEventListener("DOMContentLoaded", function () {
    function buscarMedicos() {
        fetch("http://localhost:8080/api/medicos")
            .then(response => response.json())
            .then(data => {
                const tabelaMedicos = document.getElementById("tabelaMedicos");
                tabelaMedicos.innerHTML = "";

                data.forEach(medico => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${medico.nome}</td>
                        <td>${medico.especialidade}</td>
                        <td>${medico.crm}</td>
                        <td>
                            <button type="button" class="btn btn-warning btnAlterarMedico" data-id="${medico.id}">Alterar</button>
                            <button type="button" class="btn btn-danger btnDeletarMedico" data-id="${medico.id}">Deletar</button>
                        </td>
                    `;
                    tabelaMedicos.appendChild(tr);
                });

                const btnAlterarMedico = document.querySelectorAll(".btnAlterarMedico");
                btnAlterarMedico.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const medicoId = parseInt(btn.getAttribute("data-id"));
                        const nome = prompt("Digite o novo nome do médico:");
                        const especialidade = prompt("Digite a nova especialidade do médico:");
                        const crm = prompt("Digite o novo CRM do médico:");

                        const medicoAtualizado = {
                            nome: nome,
                            especialidade: especialidade,
                            crm: crm
                        };

                        fetch(`http://localhost:8080/api/medicos/${medicoId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(medicoAtualizado)
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("Médico atualizado com sucesso!");
                                buscarMedicos();
                            } else {
                                throw new Error("Erro ao atualizar médico.");
                            }
                        })
                        .catch(error => {
                            console.error("Erro:", error);
                            alert("Erro ao atualizar médico. Por favor, tente novamente.");
                        });
                    });
                });

                const btnDeletarMedico = document.querySelectorAll(".btnDeletarMedico");
                btnDeletarMedico.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const medicoId = parseInt(btn.getAttribute("data-id"));

                        if (confirm("Tem certeza que deseja deletar este médico?")) {
                            fetch(`http://localhost:8080/api/medicos/${medicoId}`, {
                                method: "DELETE"
                            })
                            .then(response => {
                                if (response.ok) {
                                    alert("Médico deletado com sucesso!");
                                    buscarMedicos();
                                } else {
                                    throw new Error("Erro ao deletar médico.");
                                }
                            })
                            .catch(error => {
                                console.error("Erro:", error);
                                alert("Erro ao deletar médico. Por favor, tente novamente.");
                            });
                        }
                    });
                });
            })
            .catch(error => {
                console.error("Erro ao buscar médicos:", error);
            });
    }

    buscarMedicos();
});
