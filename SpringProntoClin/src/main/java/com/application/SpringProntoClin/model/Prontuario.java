package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity (name = "Prontuario")
@Table (name = "tbProntuario")
public class Prontuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProntuario;
    private int idPaciente;
    private Date dataCriacao;
    private Date dataUltimaAtualizacao;
}
