package br.com.projetoES.ProjetoES.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import br.com.projetoES.ProjetoES.DAO.PacienteInterface;
import br.com.projetoES.ProjetoES.entities.Paciente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@RequestMapping("/agendamento")
public class PacienteController {

    private static final Logger logger = LoggerFactory.getLogger(PacienteController.class);

    @Autowired
    private PacienteInterface pacienteInterface;

       @GetMapping
    public String agendamentoPage() {
        return "agendamento";
    }

    @PostMapping("/agendar")
    public ResponseEntity<?> agendarPaciente(@RequestBody Paciente paciente) {
        try {
            logger.info("Agendando paciente: {}", paciente);
            Paciente pacienteNovo = pacienteInterface.save(paciente);
            return ResponseEntity.ok(pacienteNovo);
        } catch (Exception e) {
            logger.error("Erro ao agendar consulta", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao agendar consulta: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        Optional<Paciente> pacienteExistenteOptional = pacienteInterface.findById(id);
        if (pacienteExistenteOptional.isPresent()) {
            Paciente pacienteExistente = pacienteExistenteOptional.get();
            pacienteAtualizado.setId(pacienteExistente.getId());
            pacienteAtualizado.setMedicoId(pacienteExistente.getMedicoId());
            try {
                Paciente pacienteAtual = pacienteInterface.save(pacienteAtualizado);
                return ResponseEntity.ok(pacienteAtual);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Erro ao editar o paciente: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirPaciente(@PathVariable Long id) {
        Optional<Paciente> pacienteOptional = pacienteInterface.findById(id);
        if (pacienteOptional.isPresent()) {
            try {
                pacienteInterface.deleteById(id);
                return ResponseEntity.ok("Paciente excluído com sucesso!");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Erro ao excluir o paciente: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
