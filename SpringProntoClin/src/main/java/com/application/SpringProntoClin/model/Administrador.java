package com.application.SpringProntoClin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
