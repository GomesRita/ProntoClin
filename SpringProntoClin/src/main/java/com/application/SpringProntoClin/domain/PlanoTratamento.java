package com.application.SpringProntoClin.domain;

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
    private Long idPlanoTratamento;
    private Long idProntuario;
    private String encaminhamentos;
    private String orientacoes;

}
