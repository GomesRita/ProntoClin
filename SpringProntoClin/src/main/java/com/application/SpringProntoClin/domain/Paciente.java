package com.application.SpringProntoClin.domain;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "paciente")
@Table(name = "paciente")
@EqualsAndHashCode(of = "idPaciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "paciente_seq_generator")
    @SequenceGenerator(name = "paciente_seq_generator", sequenceName = "paciente_SEQ", allocationSize = 1)
    private Long idpaciente;

    private String nomepaciente;
    private String nomesocial;

    @Column(unique = true)
    private String telefonepaciente;

    @Column(unique = true)
    private String cpfpaciente;

    private Date datanascimento;
    private String sexopaciente;
    private String senha;

    @Column(unique = true)
    private String emailpaciente;
}
