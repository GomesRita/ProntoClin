package com.application.SpringProntoClin.domain;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idDiagnostico")
@Entity (name = "Diagnostico")
@Table(name = "tbDiagnostico")
public class Diagnostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDiagnostico;
    private Long idProntuario;
    private String diagnostico;
    private String outrosDiagnosticos;
}
