package br.com.projetoES.ProjetoES.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoES.ProjetoES.entities.Medico;

public interface MedicoInterface extends JpaRepository<Medico, Long> {
    
  
}
