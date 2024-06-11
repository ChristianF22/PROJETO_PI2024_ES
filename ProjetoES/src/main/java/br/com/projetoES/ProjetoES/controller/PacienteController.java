package br.com.projetoES.ProjetoES.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.*;

import br.com.projetoES.ProjetoES.DAO.PacienteInterface;
import br.com.projetoES.ProjetoES.entities.Paciente;

@Controller
public class PacienteController {

    @Autowired
    private PacienteInterface pacienteInterface;

    @GetMapping("/agendamento")
    public String agendamento() {
        return "agendamento";
    }

    @PostMapping("/agendamento")
    public ResponseEntity<?> agendarConsulta(@RequestBody Paciente paciente) {
        Paciente pacienteNovo = pacienteInterface.save(paciente);
        return ResponseEntity.ok(pacienteNovo);
    }

    @PutMapping("/agendamento/{id}")
    public ResponseEntity<?> editarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        Optional<Paciente> pacienteExistenteOptional = pacienteInterface.findById(id);
        if (pacienteExistenteOptional.isPresent()) {
            Paciente pacienteExistente = pacienteExistenteOptional.get();
            pacienteExistente.setNomePaciente(pacienteAtualizado.getNomePaciente());
            pacienteExistente.setEmail(pacienteAtualizado.getEmail());
            pacienteExistente.setClinica(pacienteAtualizado.getClinica());
            pacienteExistente.setEspecialidade(pacienteAtualizado.getEspecialidade());
            pacienteExistente.setDataHoraAgendamento(pacienteAtualizado.getDataHoraAgendamento());

            Paciente pacienteAtual = pacienteInterface.save(pacienteExistente);
            return ResponseEntity.ok(pacienteAtual);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/agendamento/{id}")
    public ResponseEntity<?> excluirPaciente(@PathVariable Long id) {
        Optional<Paciente> pacienteOptional = pacienteInterface.findById(id);
        if (pacienteOptional.isPresent()) {
            pacienteInterface.deleteById(id);
            return ResponseEntity.ok("Paciente excluído com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<?> handleMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                             .body("Tipo de mídia não suportado. Use application/json.");
    }
}
