package br.com.projetoES.ProjetoES.DAO;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.projetoES.ProjetoES.entities.PacientesAgendamento;

public interface PacientesAgendamentoInterface extends JpaRepository<PacientesAgendamento, Long>{
    
    @Query("SELECT pa FROM PacientesAgendamento pa")
    List<PacientesAgendamento> listarTodos();
    
}
