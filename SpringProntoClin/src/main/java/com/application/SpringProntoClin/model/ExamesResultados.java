package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idExameResultado")
@Entity (name = "ExamesResultados")
@Table(name = "tbExamesResultados")
public class ExamesResultados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idExameResultado;
    private int idProntuario;
    private String tipo;
    private Date dataRealizacao;
    private String exame;
    private String resultado;
}
