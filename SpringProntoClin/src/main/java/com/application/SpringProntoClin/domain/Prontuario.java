package com.application.SpringProntoClin.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idProntuario")
@Entity (name = "Prontuario")
@Table (name = "tbProntuario")
public class Prontuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProntuario;
    private Long idPaciente;
    private Date dataCriacao;
    private Date dataUltimaAtualizacao;
}
