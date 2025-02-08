package com.application.SpringProntoClin.model;

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
    private int idProntuario;
    private int idPaciente;
    private Date dataCriacao;
    private Date dataUltimaAtualizacao;
}
