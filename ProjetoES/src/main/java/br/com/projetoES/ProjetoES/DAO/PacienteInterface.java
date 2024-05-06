package br.com.projetoES.ProjetoES.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoES.ProjetoES.entities.Paciente;

public interface PacienteInterface extends JpaRepository<Paciente, Long> {
    
}
