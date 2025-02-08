package com.application.SpringProntoClin.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity (name = "Paciente")
@Table(name = "tbPaciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPaciente;
    private String nomePaciente;
    private String nomeSocial;
    private String telefonePaciente;
    private String cpfPaciente;
    private Date dataNascimento;
    private String senha;
    private String email;
}
