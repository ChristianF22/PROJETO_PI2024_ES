package br.com.projetoES.ProjetoES.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import br.com.projetoES.ProjetoES.DAO.MedicoInterface;
import br.com.projetoES.ProjetoES.entities.Medico;

@Controller
public class MedicoController {
    
    @Autowired
    private MedicoInterface medicoInterface;

    
    @GetMapping("/controllerAdmin")
    public String mostrarFormularioMedico() {
        return "controllerAdmin"; 
    }

    @GetMapping("/api/medicos")
    @ResponseBody
    public Iterable<Medico> listarMedicos() {
        return medicoInterface.findAll();
    }

    @PostMapping("/api/medicos")
    @ResponseBody
    public Medico adicionarMedico(@RequestBody Medico medico){
        return medicoInterface.save(medico);
    }

    @PutMapping("/api/medicos/{id}")
    @ResponseBody
    public Medico atualizarMedico(@PathVariable Long id, @RequestBody Medico medicoAtualizado) {
        Optional<Medico> medicoExistenteOptional = medicoInterface.findById(id);
        if (medicoExistenteOptional.isPresent()) {
            Medico medicoExistente = medicoExistenteOptional.get();
            medicoAtualizado.setId(medicoExistente.getId());
            return medicoInterface.save(medicoAtualizado);
        } else {
            throw new RuntimeException("Médico não encontrado com o ID: " + id);
        }
    }

    @DeleteMapping("/api/medicos/{id}")
    @ResponseBody
    public String removerMedico(@PathVariable Long id) {
        Optional<Medico> medicoOptional = medicoInterface.findById(id);
        if (medicoOptional.isPresent()) {
            medicoInterface.deleteById(id);
            return "Médico removido com sucesso!";
        } else {
            throw new RuntimeException("Médico não encontrado com o ID: " + id);
        }
    }
}

