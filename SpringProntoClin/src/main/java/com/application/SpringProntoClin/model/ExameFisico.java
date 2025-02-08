package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity (name = "ExameFisico")
@Table (name = "tbExameFisico")
public class ExameFisico {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idExameFisico;
    private int idProntuario;
    private float pressaoArterial;
    private float frequenciaCardiaca;
    private float temperatura;
    private float peso;
    private int altura;
}
