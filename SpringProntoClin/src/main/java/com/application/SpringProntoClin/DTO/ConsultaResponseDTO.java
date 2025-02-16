package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.Consulta;

import java.util.Date;

public record ConsultaResponseDTO(Long idConsulta, Long idPaciente, Long idProfissionalSaude, String nomeProfissionalSaude, String nomePaciente, Date dataConsulta, String especialidadeMedica) {

    public ConsultaResponseDTO(Consulta consulta) {
        this(consulta.getIdConsulta(), consulta.getIdPaciente(), consulta.getIdProfissionalSaude(), consulta.getNomeProssionalSaude(), consulta.getNomePaciente(), consulta.getDataConsulta(), consulta.getEspecialidadeMedica());
    }
}
