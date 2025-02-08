package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idAdministrador")
@Entity (name = "Administrador")
@Table (name = "tbAdministrador")
public class Administrador {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAdministrador;
    private String nomeAdministrador;
    private String cpfAdministrador;
    private String senha;
    private String email;

}
