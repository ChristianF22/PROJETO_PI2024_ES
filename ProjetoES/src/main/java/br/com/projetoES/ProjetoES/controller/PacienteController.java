package br.com.projetoES.ProjetoES.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.projetoES.ProjetoES.DAO.MedicoInterface;
import br.com.projetoES.ProjetoES.DAO.PacienteInterface;
import br.com.projetoES.ProjetoES.entities.Paciente;

@Controller
public class PacienteController {

    @Autowired
    private PacienteInterface pacienteInterface;

    @GetMapping("/agendamento")
    public String agendamentoPage() {
        return "agendamento";
    }

    @ResponseBody
    @PostMapping(value = "/agendamento", consumes = "application/json")
    public ResponseEntity<?> agendarPaciente(@RequestBody Paciente paciente) {
        try {
            Paciente pacienteNovo = pacienteInterface.save(paciente);
            return ResponseEntity.ok(pacienteNovo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao agendar consulta: " + e.getMessage());
        }
    }

    @PutMapping("/agendamento/{id}")
    public ResponseEntity<?> editarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        try {
            Optional<Paciente> pacienteExistenteOptional = pacienteInterface.findById(id);
            if (pacienteExistenteOptional.isPresent()) {
                Paciente pacienteExistente = pacienteExistenteOptional.get();
                pacienteAtualizado.setId(pacienteExistente.getId());
                pacienteAtualizado.setMedicoId(pacienteExistente.getMedicoId());
                Paciente pacienteAtual = pacienteInterface.save(pacienteAtualizado);
                return ResponseEntity.ok(pacienteAtual);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao editar o paciente. Por favor, tente novamente.");
        }
    }

    @DeleteMapping("/agendamento/{id}")
    public ResponseEntity<?> excluirPaciente(@PathVariable Long id) {
        try {
            Optional<Paciente> pacienteOptional = pacienteInterface.findById(id);
            if (pacienteOptional.isPresent()) {
                pacienteInterface.deleteById(id);
                return ResponseEntity.ok("Paciente excluído com sucesso!");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao excluir o paciente. Por favor, tente novamente.");
        }
    }
}
