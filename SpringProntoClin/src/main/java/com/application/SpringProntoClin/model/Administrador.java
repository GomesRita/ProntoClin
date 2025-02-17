package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idAdministrador")
@Entity(name = "Administrador")
@Table(name = "tb_administrador")
public class Administrador {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdministrador;

    @Column(name = "nomeAdministador")
    private String nomeAdministrador;

    @Column(name = "cpfAdministrador")
    private String cpfAdministrador;

    @Column(name = "senha")
    private String senha;

    @Column(name = "email")
    private String email;

}
