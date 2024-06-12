package br.com.projetoES.ProjetoES.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import br.com.projetoES.ProjetoES.DAO.PacienteInterface;
import br.com.projetoES.ProjetoES.entities.Paciente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class PacienteController {

    @Autowired
    private PacienteInterface pacienteInterface;

    private static final Logger logger = LoggerFactory.getLogger(PacienteController.class);

    @GetMapping("/agendamento")
    public String agendamento() {
        return "agendamento";
    }

    @GetMapping("/api/agendamento")
    @ResponseBody
    public List<Paciente> listarMedicos() {
        return pacienteInterface.findAll();
    }

    @PostMapping("/api/agendamento")
    @ResponseBody
    public ResponseEntity<?> adicionarPaciente(@RequestBody Paciente paciente) {
        try {
            logger.info("Tentando adicionar paciente: " + paciente);
            paciente.setDataAgendamento(LocalDateTime.now());
            Paciente salvo = pacienteInterface.save(paciente);
            logger.info("Paciente salvo com sucesso: " + salvo);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            String mensagem = "Erro ao adicionar paciente: " + e.getMessage();
            logger.error(mensagem, e);
            return ResponseEntity.status(500).body(mensagem);
        }
    }

    @PutMapping("/api/agendamento/{id}")
    @ResponseBody
    public ResponseEntity<?> atualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        try {
            Optional<Paciente> pacienteExistenteOptional = pacienteInterface.findById(id);
            if (pacienteExistenteOptional.isPresent()) {
                Paciente pacienteExistente = pacienteExistenteOptional.get();
                pacienteAtualizado.setId(pacienteExistente.getId());
                Paciente atualizado = pacienteInterface.save(pacienteAtualizado);
                return ResponseEntity.ok(atualizado);
            } else {
                return ResponseEntity.status(404).body("Paciente não encontrado com o ID: " + id);
            }
        } catch (Exception e) {
            String mensagem = "Erro ao atualizar paciente: " + e.getMessage();
            logger.error(mensagem, e);
            return ResponseEntity.status(500).body(mensagem);
        }
    }

    @DeleteMapping("/api/agendamento/{id}")
    @ResponseBody
    public ResponseEntity<?> removerPaciente(@PathVariable Long id) {
        try {
            Optional<Paciente> pacienteOptional = pacienteInterface.findById(id);
            if (pacienteOptional.isPresent()) {
                pacienteInterface.deleteById(id);
                return ResponseEntity.ok("Agendamento removido com sucesso!");
            } else {
                return ResponseEntity.status(404).body("Agendamento não encontrado com o ID: " + id);
            }
        } catch (Exception e) {
            String mensagem = "Erro ao remover paciente: " + e.getMessage();
            logger.error(mensagem, e);
            return ResponseEntity.status(500).body(mensagem);
        }
    }
}
