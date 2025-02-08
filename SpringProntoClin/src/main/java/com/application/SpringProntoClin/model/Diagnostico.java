package com.application.SpringProntoClin.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity (name = "Diagnostico")
@Table(name = "tbDiagnostico")
public class Diagnostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDiagnostico;
    private int idProntuario;
    private String diagnostico;
    private String outrosDiagnosticos;
}
