package br.com.projetoES.ProjetoES.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import br.com.projetoES.ProjetoES.DAO.PacienteInterface;
import br.com.projetoES.ProjetoES.entities.Paciente;



@Controller
public class PacienteController {
    
    @Autowired
    private PacienteInterface pacienteInterface;

    @GetMapping("/agendamento")
    public String agendamentoPage(){
        return "agendamento";
    }
    

    @ResponseBody
    @PostMapping(value = "/agendamento", consumes = "application/json")
    public ResponseEntity<String> agendarPaciente(@RequestBody Paciente paciente) {
        Paciente pacienteNovo = pacienteInterface.save(paciente);
        String mensagem = "Consulta agendada para " + pacienteNovo.getNomePaciente() + " na clínica " + pacienteNovo.getClinica() + ", com o médico(a) " + pacienteNovo.getMedicoId() + ", no dia " + pacienteNovo.getDataHoraAgendamento();
        return ResponseEntity.ok(mensagem);
    }

    @PutMapping("/agendamento/{id}")
    public ResponseEntity<Paciente> editarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        Optional<Paciente> pacienteExistenteOptional = pacienteInterface.findById(id);
        if (pacienteExistenteOptional.isPresent()) {
            Paciente pacienteExistente = pacienteExistenteOptional.get();
            pacienteAtualizado.setId(pacienteExistente.getId());
            Paciente pacienteAtual = pacienteInterface.save(pacienteAtualizado);
            return ResponseEntity.ok(pacienteAtual);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/agendamento/{id}")
    public ResponseEntity<String> excluirPaciente(@PathVariable Long id) {
        Optional<Paciente> pacienteOptional = pacienteInterface.findById(id);
        if (pacienteOptional.isPresent()) {
            pacienteInterface.deleteById(id);
            return ResponseEntity.ok("Paciente excluído com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
