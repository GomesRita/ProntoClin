package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idHistoricoMedico")
@Entity (name = "HistoricoMedico")
@Table (name = "tbHistoricoMedico")
public class HistoricoMedico {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHistoricoMedico;
    private Long idProntuario;
    private String sintomas;
    private String historicoDoencas;
    private String alergias;
    private String medicamentoContinuos;
}
