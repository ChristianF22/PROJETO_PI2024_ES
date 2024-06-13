package br.com.projetoES.ProjetoES.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoES.ProjetoES.entities.Recepcionista;


@Repository
public interface RecepcionistaInterface extends JpaRepository<Recepcionista, Long> {
    Recepcionista findByLogin(String login);
}
