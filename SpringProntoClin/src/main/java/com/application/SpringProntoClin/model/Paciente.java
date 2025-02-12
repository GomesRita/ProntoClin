package com.application.SpringProntoClin.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idPaciente")
@Entity (name = "Paciente")
@Table(name = "tbPaciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaciente;
    private String nomePaciente;
    private String nomeSocial;
    private String telefonePaciente;
    private String cpfPaciente;
    private Date dataNascimento;
    private String sexoPaciente;
    private String senha;
    private String email;
}
