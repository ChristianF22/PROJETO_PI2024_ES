package br.com.projetoES.ProjetoES.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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

    @PostMapping("/api/agendamento")
    @ResponseBody
    public Paciente adicionarPaciente(@RequestBody Paciente paciente) {
        return pacienteInterface.save(paciente);
    }

    @PutMapping("/api/agendamento/{id}")
    @ResponseBody
    public Paciente atualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        Optional<Paciente> pacienteExistenteOptional = pacienteInterface.findById(id);
        if (pacienteExistenteOptional.isPresent()) {
            Paciente pacienteExistente = pacienteExistenteOptional.get();
            pacienteAtualizado.setId(pacienteExistente.getId());
            return pacienteInterface.save(pacienteAtualizado);
        } else {
            throw new RuntimeException("Paciente não encontrado com o ID: " + id);
        }
    }

    @DeleteMapping("/api/agendamento/{id}")
    @ResponseBody
    public String removerPaciente(@PathVariable Long id) {
        Optional<Paciente> pacienteOptional = pacienteInterface.findById(id);
        if (pacienteOptional.isPresent()) {
            pacienteInterface.deleteById(id);
            return "Agendamento removido com sucesso!";
        } else {
            throw new RuntimeException("Agendamento não encontrado com o ID: " + id);
        }
    }
}
