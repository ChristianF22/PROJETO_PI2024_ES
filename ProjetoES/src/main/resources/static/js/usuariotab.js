document.addEventListener("DOMContentLoaded", function () {
    function buscarUsuario() {
        fetch("http://localhost:8080/api/usuarios")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar usuários.");
                }
                return response.json();
            })
            .then(data => {
                const tabelaUsuario = document.getElementById("tabelaUsuario");
                tabelaUsuario.innerHTML = "";

                data.forEach(usuario => {
                    const tr = document.createElement("tr");
                    const status = usuario.ativo ? "Ativo" : "Inativo";
                    const statusClass = usuario.ativo ? "text-success" : "text-danger";

                    tr.innerHTML = `
                        <td>${usuario.login}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.dataNascimento}</td>
                        <td class="${statusClass}">${status}</td>
                        <td>
                            <button type="button" class="btn btn-warning btnAlterarUsuario" data-id="${usuario.id}">Alterar</button>
                            <button type="button" class="btn btn-danger btnDeletarUsuario" data-id="${usuario.id}">Deletar</button>
                        </td>
                    `;

                    tabelaUsuario.appendChild(tr);
                });

                adicionarEventosAlterarDeletar();
            })
            .catch(error => {
                console.error("Erro ao buscar usuários: ", error);
                alert("Erro ao buscar usuários. Por favor, tente novamente.");
            });
    }

    function adicionarEventosAlterarDeletar() {
        const btnAlterarUsuario = document.querySelectorAll(".btnAlterarUsuario");
        btnAlterarUsuario.forEach(btn => {
            btn.addEventListener("click", () => {
                const usuarioId = parseInt(btn.getAttribute("data-id"));
                const login = prompt("Digite um novo Login:");
                const nome = prompt("Digite um novo Nome:");
                const status = prompt("Alterar o Status (1 para Ativo, 0 para Inativo):");

                if (login !== null && nome !== null && status !== null) {
                    const usuarioAtualizado = {
                        login: login,
                        nome: nome,
                        ativo: status === '1'
                    };

                    fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(usuarioAtualizado)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Erro ao atualizar usuário.");
                        }
                        alert("Usuário atualizado com sucesso!!");
                        buscarUsuario();
                    })
                    .catch(error => {
                        console.error("Erro ao atualizar usuário: ", error);
                        alert("Erro ao atualizar usuário. Por favor, tente novamente.");
                    });
                } else {
                    alert("Por favor, preencha todos os campos.");
                }
            });
        });
    }

    buscarUsuario();
});
