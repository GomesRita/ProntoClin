package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idConsulta")
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
