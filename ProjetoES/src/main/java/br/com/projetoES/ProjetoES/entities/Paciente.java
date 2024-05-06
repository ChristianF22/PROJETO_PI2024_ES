package br.com.projetoES.ProjetoES.entities;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "agendamento")
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nomePaciente")
    private String nomePaciente;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private String status;

    @Column(name = "clinica")
    private String clinica;

    @Column(name = "medico_id")
    private Long medicoId;

    @Column(name = "dataHoraAgendamento")
    private Timestamp dataHoraAgendamento;

    @Column(name = "dataCadastro", insertable = false, updatable = false)
    private Timestamp dataCadastro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClinica() {
        return clinica;
    }

    public void setClinica(String clinica) {
        this.clinica = clinica;
    }

    public Long getMedicoId() {
        return medicoId;
    }

    public void setMedicoId(Long medicoId) {
        this.medicoId = medicoId;
    }

    public Timestamp getDataHoraAgendamento() {
        return dataHoraAgendamento;
    }

    public void setDataHoraAgendamento(Timestamp dataHoraAgendamento) {
        this.dataHoraAgendamento = dataHoraAgendamento;
    }

    public Timestamp getDataCadastro(){
        return dataCadastro;
    }

    public void setDataCadastro(Timestamp dataCadastro){
        this.dataCadastro = dataCadastro;
    }
}