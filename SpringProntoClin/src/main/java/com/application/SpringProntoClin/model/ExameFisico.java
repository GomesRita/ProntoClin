package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idExameFisico")
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
