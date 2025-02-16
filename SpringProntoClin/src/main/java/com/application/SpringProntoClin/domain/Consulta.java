package com.application.SpringProntoClin.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idconsulta")
@Entity (name = "consulta")
@Table (name = "consulta")
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "consulta_seq_generator")
    @SequenceGenerator(name = "consulta_seq_generator", sequenceName = "consulta_SEQ", allocationSize = 1)
    private Long idconsulta;
    private Long idpaciente;
    private Long idprofissionalsaude;
    private String nomeprossionalsaude;
    private String nomepaciente;
    private String nomesocial;
    private Date dataconsulta;
    private String especialidademedica;

}
