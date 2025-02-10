package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity (name = "PlanoTratamento")
@Table (name = "tbPlanoTratamento")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idPlanoTratamento")
public class PlanoTratamento {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPlanoTratamento;
    private int idProntuario;
    private String encaminhamentos;
    private String orientacoes;

}
