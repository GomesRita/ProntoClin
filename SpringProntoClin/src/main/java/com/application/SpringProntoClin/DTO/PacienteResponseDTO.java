package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.model.Paciente;

import java.util.Date;

public record PacienteResponseDTO(int idPaciente, String nomePaciente, String nomeSocial, String telefonePaciente, String cpfPaciente, Date dataNascimento, String sexoPaciente, String senha, String email) {

    public PacienteResponseDTO(Paciente paciente) {
        this(paciente.getIdPaciente(), paciente.getNomePaciente(), paciente.getNomeSocial(), paciente.getTelefonePaciente(), paciente.getCpfPaciente(), paciente.getDataNascimento(), paciente.getSexoPaciente(), paciente.getSenha(), paciente.getEmail());
    }
}
