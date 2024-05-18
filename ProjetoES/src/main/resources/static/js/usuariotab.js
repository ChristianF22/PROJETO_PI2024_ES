document.addEventListener("DOMContentLoaded", function () {
    function buscarUsuario() {
        fetch("http://localhost:8080/api/usuarios")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar usuários");
                }
                return response.json();
            })
            .then(data => {
                const tabelaUsuario = document.getElementById("tabelaUsuario");
                if (!tabelaUsuario) {
                    throw new Error('Elemento tabelaUsuario não encontrado');
                }
                tabelaUsuario.innerHTML = "";

                data.forEach(usuario => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${usuario.login}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.data_nascimento}</td>
                        <td>${usuario.status}</td>
                        <td>
                            <button type="button" class="btn btn-warning btnAlterarUsuario" data-id="${usuario.id}">Alterar</button>
                            <button type="button" class="btn btn-danger btnDeletarUsuario" data-id="${usuario.id}">Deletar</button>
                        </td>
                    `;

                    tabelaUsuario.appendChild(tr);
                });

                const btnAlterarUsuario = document.querySelectorAll(".btnAlterarUsuario");
                btnAlterarUsuario.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const usuarioId = parseInt(btn.getAttribute("data-id"));
                        const login = prompt("Digite um novo Login:");
                        const nome = prompt("Digite um novo Nome:");
                        const status = prompt("Alterar o Status:");

                        const usuarioAtualizado = {
                            login: login,
                            nome: nome,
                            status: status
                        };

                        fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(usuarioAtualizado)
                        })
                            .then(response => {
                                if (response.ok) {
                                    alert("Usuário atualizado com sucesso!!");
                                    buscarUsuario(); // Atualiza a lista de usuários
                                } else {
                                    throw new Error("Erro ao atualizar usuário.");
                                }
                            })
                            .catch(error => {
                                console.error("Erro: ", error);
                                alert("Erro ao atualizar usuário. Por favor, tente novamente.");
                            });
                    });
                });

                const btnDeletarUsuario = document.querySelectorAll(".btnDeletarUsuario");
                btnDeletarUsuario.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const usuarioId = parseInt(btn.getAttribute("data-id"));

                        if (confirm("Tem certeza que deseja deletar este usuário?")) {
                            fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                                method: "DELETE"
                            })
                                .then(response => {
                                    if (response.ok) {
                                        alert("Usuário deletado com sucesso!");
                                        buscarUsuario(); // Atualiza a lista de usuários
                                    } else {
                                        throw new Error("Erro ao deletar usuário.");
                                    }
                                })
                                .catch(error => {
                                    console.error("Erro:", error);
                                    alert("Erro ao deletar usuário. Por favor, tente novamente.");
                                });
                        }
                    });
                });

            })
            .catch(error => {
                console.error("Erro ao buscar usuários: ", error);
            });
    }

    buscarUsuario();
});
