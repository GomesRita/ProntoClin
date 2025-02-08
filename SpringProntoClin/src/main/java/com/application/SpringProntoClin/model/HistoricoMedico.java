package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity (name = "HistoricoMedico")
@Table (name = "tbHistoricoMedico")
public class HistoricoMedico {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idHistoricoMedico;
    private int idProntuario;
    private String sintomas;
    private String historicoDoencas;
    private String alergias;
    private String medicamentoContinuos;
}
