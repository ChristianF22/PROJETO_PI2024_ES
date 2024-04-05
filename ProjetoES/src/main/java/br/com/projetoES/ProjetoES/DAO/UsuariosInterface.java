package br.com.projetoES.ProjetoES.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoES.ProjetoES.entities.Usuario;

public interface UsuariosInterface extends JpaRepository<Usuario, Long> {

}