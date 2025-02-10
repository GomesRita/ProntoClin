package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idProfissionalSaude")
@Entity (name = "ProfissionalSaude")
@Table (name = "tbProfissionalSaude")
public class ProfissionalSaude {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProfissionalSaude;
    private String nomeProfissionalSaude;
    private String cpfProfissionalSaude;
    private String especialidadeMedica;
    private String telefoneProfissionalSaude;
    private String CRM;
    private String senha;
    private String email;
}
