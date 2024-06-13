package br.com.projetoES.ProjetoES.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import br.com.projetoES.ProjetoES.DAO.PacientesAgendamentoInterface;
import br.com.projetoES.ProjetoES.entities.PacientesAgendamento;

@Controller
public class PacienteAgendamentoController {

    @Autowired
    private PacientesAgendamentoInterface pacienteinterface;

    @GetMapping("/pacientes")
    public String paciente(){
        return "pacientesagendamento";
    }

    @GetMapping("/api/pacientes")
    public ResponseEntity<List<PacientesAgendamento>> listarPacientes() {
        List<PacientesAgendamento> pacientes = pacienteinterface.findAll();
        return ResponseEntity.ok(pacientes);
    }

    @GetMapping("/api/pacientes/{id}")
    public ResponseEntity<PacientesAgendamento> buscarPacientePorId(@PathVariable Long id) {
        PacientesAgendamento paciente = pacienteinterface.findById(id).orElse(null);
        if (paciente != null) {
            return ResponseEntity.ok(paciente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/pacientes")
    public ResponseEntity<PacientesAgendamento> cadastrarPaciente(@RequestBody PacientesAgendamento paciente) {
        PacientesAgendamento novoPaciente = pacienteinterface.save(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPaciente);
    }

    @PutMapping("/api/pacientes/{id}")
    public ResponseEntity<PacientesAgendamento> atualizarPaciente(@PathVariable Long id,@RequestBody PacientesAgendamento pacienteAtualizado) {
        PacientesAgendamento paciente = pacienteinterface.findById(id).orElse(null);
        if (paciente != null) {
            paciente.setId(id);
            paciente.setDocumento(pacienteAtualizado.getDocumento());
            paciente.setSexo(pacienteAtualizado.getSexo());
            paciente.setDataNascimento(pacienteAtualizado.getDataNascimento());
            paciente.setNome(pacienteAtualizado.getNome());
            
            pacienteinterface.save(paciente); 

            return ResponseEntity.ok(paciente);
        } else {
            throw new RuntimeException("Paciente não encontrado com o ID: " + pacienteAtualizado.getId());
            //return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/pacientes/{id}")
    public ResponseEntity<Void> deletarPaciente(@PathVariable Long id) {
        PacientesAgendamento paciente = pacienteinterface.findById(id).orElse(null);
        if (paciente != null) {
            pacienteinterface.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
