document.addEventListener("DOMContentLoaded", function() {
    carregarPacientes();

    document.getElementById("patientForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const pacienteData = {
            documento: document.getElementById("document").value,
            sexo: document.getElementById("sex").value,
            dataNascimento: document.getElementById("birthdate").value,
            nome: document.getElementById("name").value
        };

        const pacienteId = document.getElementById("patientId").value;

        const url = pacienteId ? `/api/pacientes/${pacienteId}` : '/api/pacientes';
        const method = pacienteId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pacienteData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar paciente.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Paciente salvo/atualizado com sucesso:', data);
            alert('Paciente salvo/atualizado com sucesso!');
            document.getElementById("patientForm").reset(); 
            carregarPacientes(); 
        })
        .catch(error => {
            console.error('Erro ao salvar/atualizar paciente:', error);
            alert('Erro ao salvar/atualizar paciente. Verifique o console para mais detalhes.');
        });
    });

    function carregarPacientes() {
        fetch('/api/pacientes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar pacientes.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Pacientes carregados:', data);
            exibirPacientes(data);
        })
        .catch(error => {
            console.error('Erro ao carregar pacientes:', error);
            alert('Erro ao carregar pacientes. Verifique o console para mais detalhes.');
        });
    }


    function exibirPacientes(pacientes) {
        const tabelaBody = document.getElementById('patientTableBody');
        tabelaBody.innerHTML = '';

        pacientes.forEach(paciente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.documento}</td>
                <td>${paciente.sexo}</td>
                <td>${formatarData(paciente.dataNascimento)}</td>
                <td>${paciente.nome}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" onclick="editarPaciente(${paciente.id})">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="excluirPaciente(${paciente.id})">Excluir</button>
                </td>
            `;
            tabelaBody.appendChild(row);
        });
    }


    function formatarData(data) {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); 
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    
    window.editarPaciente = function(id) {
        fetch(`/api/consultamedica/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar consulta para edição.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Consulta para edição:', data);
        
            document.getElementById('consultaId').value = data.id;
            document.getElementById('paciente').value = data.paciente;
            document.getElementById('medico').value = data.medico;
            document.getElementById('queixa').value = data.queixa;
            document.getElementById('diagnostico').value = data.diagnostico;
        })
        .catch(error => {
            console.error('Erro ao carregar consulta para edição:', error);
            alert('Erro ao carregar consulta para edição. Verifique o console para mais detalhes.');
        });
    }

    window.excluirPaciente = function(id) {
        if (confirm('Tem certeza que deseja excluir este paciente?')) {
            fetch(`/api/pacientes/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir paciente.');
                }
                alert('Paciente excluído com sucesso!');
                carregarPacientes();
            })
            .catch(error => {
                console.error('Erro ao excluir paciente:', error);
                alert('Erro ao excluir paciente. Verifique o console para mais detalhes.');
            });
        }
    }
});
