package br.com.projetoES.ProjetoES.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoES.ProjetoES.entities.Usuario;

@Repository
public interface UsuariosInterface extends JpaRepository<Usuario, Long> {
    Usuario findByLogin(String login);
}