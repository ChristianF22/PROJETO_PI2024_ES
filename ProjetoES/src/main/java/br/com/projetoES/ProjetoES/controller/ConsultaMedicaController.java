package br.com.projetoES.ProjetoES.controller;

import java.util.List;
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

import br.com.projetoES.ProjetoES.DAO.ConsultaMedicaInterface;
import br.com.projetoES.ProjetoES.entities.ConsultaMedica;

@Controller
public class ConsultaMedicaController {
    
    @Autowired
    private ConsultaMedicaInterface consultaMedicaInterface;

    @GetMapping("/consultamedica")
    public String consulta(){
        return "consultaMedica";
    }

    @GetMapping("/api/consultamedica")
    public ResponseEntity<List<ConsultaMedica>> listarConsulta(){
         List<ConsultaMedica> consulta = consultaMedicaInterface.findAll();
         return ResponseEntity.ok(consulta);
    }

    @PostMapping("/api/consultamedica")
    public ResponseEntity<ConsultaMedica> cadastrardarConsulta(@RequestBody ConsultaMedica consulta){
        ConsultaMedica novaConsulta = consultaMedicaInterface.save(consulta);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaConsulta);
    }

    @PutMapping("/api/consultamedica/{id}")
    public ResponseEntity<ConsultaMedica> atualizarConsulta(@PathVariable Long id, @RequestBody ConsultaMedica atualizarConsulta) {
        ConsultaMedica consulta = consultaMedicaInterface.findById(id).orElse(null);
        if (consulta != null) {
            consulta.setPaciente(atualizarConsulta.getPaciente());
            consulta.setQueixa(atualizarConsulta.getQueixa());
            consulta.setMedico(atualizarConsulta.getMedico());
            consulta.setDiagnostico(atualizarConsulta.getDiagnostico());
    
            consultaMedicaInterface.save(consulta);
    
            return ResponseEntity.ok(consulta);
        } else {
            throw new RuntimeException("Consulta não encontrada com o ID: " + id);
        }
    }

    @DeleteMapping("/api/consultamedica/{id}")
    public ResponseEntity<Void> deletarConsulta(@PathVariable Long id) {
        ConsultaMedica consulta = consultaMedicaInterface.findById(id).orElse(null);
        if(consulta != null){
              consultaMedicaInterface.deleteById(id);
              return ResponseEntity.noContent().build();
        } else{
            return ResponseEntity.notFound().build();
        }
    }

}
