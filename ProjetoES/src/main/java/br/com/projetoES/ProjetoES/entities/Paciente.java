package br.com.projetoES.ProjetoES.entities;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Agendamento")
@Getter
@Setter
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomePaciente;
    private String email;
    private String status;
    private String clinica;
    private Long medicoId;
    private Timestamp dataHoraAgendamento;
    private Timestamp dataCadastro;

}
