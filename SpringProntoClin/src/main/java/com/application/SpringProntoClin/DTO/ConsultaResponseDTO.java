package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.model.Consulta;

import java.util.Date;

public record ConsultaResponseDTO(int idConsulta, int idPaciente, int idProfissionalSaude, String nomeProfissionalSaude, String nomePaciente, Date dataConsulta, String especialidadeMedica) {

    public ConsultaResponseDTO(Consulta consulta) {
        this(consulta.getIdConsulta(), consulta.getIdPaciente(), consulta.getIdProfissionalSaude(), consulta.getNomeProssionalSaude(), consulta.getNomePaciente(), consulta.getDataConsulta(), consulta.getEspecialidadeMedica());
    }
}
