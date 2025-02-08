package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity (name = "Consulta")
@Table (name = "tbConsulta")
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idConsulta;
    private int idPaciente;
    private int idProfissionalSaude;
    private String nomeProssionalSaude;
    private String nomePaciente;
    private Date dataConsulta;
    private String especialidadeMedica;

}
