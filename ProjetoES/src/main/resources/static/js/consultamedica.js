document.addEventListener("DOMContentLoaded", function() {
    
    const consultaForm = document.getElementById('consultaForm'); 
    const errorMessage = document.getElementById('errorMessage');

    if (consultaForm && errorMessage) { 

        consultaForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const pacienteInput = document.getElementById('paciente');
            const medicoInput = document.getElementById('medico');
            const queixaInput = document.getElementById('queixa');
            const diagnosticoInput = document.getElementById('diagnostico');

            const consultaData = {
                paciente: pacienteInput.value.trim(),
                medico: medicoInput.value.trim(),
                queixa: queixaInput.value.trim(),
                diagnostico: diagnosticoInput.value.trim()
            };

            const consultaId = document.getElementById("consultaId").value;

            const url = consultaId ? `/api/consultamedica/${consultaId}` : '/api/consultamedica';
            const method = consultaId ? 'PUT' : 'POST';

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(consultaData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar consulta.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Consulta salva/atualizada com sucesso:', data);
                alert('Consulta salva/atualizada com sucesso!');
                consultaForm.reset(); 
                carregarConsultas(); 
            })
            .catch(error => {
                console.error('Erro ao salvar/atualizar consulta:', error);
                alert('Erro ao salvar/atualizar consulta. Verifique o console para mais detalhes.');
            });
        });

    } else {
        console.error('Elemento consultaForm ou errorMessage não encontrado.');
    }

    function carregarConsultas() {
        fetch('/api/consultamedica')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar consultas.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Consultas carregadas:', data);
            exibirConsultas(data);
        })
        .catch(error => {
            console.error('Erro ao carregar consultas:', error);
            alert('Erro ao carregar consultas. Verifique o console para mais detalhes.');
        });
    }

    function exibirConsultas(consultas) {
        const tabelaBody = document.getElementById('consultaTableBody');
        tabelaBody.innerHTML = '';

        consultas.forEach(consulta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${consulta.id}</td>
                <td>${consulta.paciente}</td>
                <td>${consulta.medico}</td>
                <td>${consulta.queixa}</td>
                <td>${consulta.diagnostico}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" onclick="editarConsulta(${consulta.id})">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="excluirConsulta(${consulta.id})">Excluir</button>
                </td>
            `;
            tabelaBody.appendChild(row);
        });
    }

    window.editarConsulta = function(id) {
        fetch(`/api/pacientes/{id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar consulta para edição.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Consulta para edição:', data);

            document.getElementById("paciente").value = data.paciente;
            document.getElementById("medico").value = data.medico;
            document.getElementById("queixa").value = data.queixa;
            document.getElementById("diagnostico").value = data.diagnostico;
        })
        .catch(error => {
            console.error('Erro ao carregar consulta para edição:', error);
            alert('Erro ao carregar consulta para edição. Verifique o console para mais detalhes.');
        });
    }

    window.excluirConsulta = function(id) {
        if (confirm('Tem certeza que deseja excluir esta consulta?')) {
            fetch(`/api/consultamedica/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir consulta.');
                }
                alert('Consulta excluída com sucesso!');
                carregarConsultas();
            })
            .catch(error => {
                console.error('Erro ao excluir consulta:', error);
                alert('Erro ao excluir consulta. Verifique o console para mais detalhes.');
            });
        }
    }

    carregarConsultas();
});
