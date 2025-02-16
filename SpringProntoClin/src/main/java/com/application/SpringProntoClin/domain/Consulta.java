package com.application.SpringProntoClin.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idConsulta")
@Entity (name = "Consulta")
@Table (name = "tbConsulta")
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConsulta;
    private Long idPaciente;
    private Long idProfissionalSaude;
    private String nomeProssionalSaude;
    private String nomePaciente;
    private Date dataConsulta;
    private String especialidadeMedica;

}
