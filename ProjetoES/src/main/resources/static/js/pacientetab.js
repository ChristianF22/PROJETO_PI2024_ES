document.addEventListener("DOMContentLoaded", function(){
    function buscarPaciente(){
        fetch("http://localhost:8080/api/agendamento")
        .then(response => response.json())
            .then(data => {
                const tabelaPaciente = document.getElementById("tabelaPaciente");
                tabelaPaciente.innerHTML = "";

                data.forEach(paciente => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${paciente.nomePaciente}</td>
                        <td>${paciente.email}</td>
                        <td>${paciente.clinica}</td>
                        <td>${paciente.especialidade}</td>
                        <td>${paciente.dataAgendamento}</td>
                    `;
                    tabelaPaciente.appendChild(tr);
                });
            })
            .catch(error => console.error("Erro ao buscar pacientes:", error));
    }

    buscarPaciente();
});
