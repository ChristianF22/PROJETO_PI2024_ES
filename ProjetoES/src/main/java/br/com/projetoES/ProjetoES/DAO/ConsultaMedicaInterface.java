package br.com.projetoES.ProjetoES.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoES.ProjetoES.entities.ConsultaMedica;

public interface ConsultaMedicaInterface extends JpaRepository<ConsultaMedica, Long>{

    Optional<ConsultaMedica> findById(Long id);
    
}
