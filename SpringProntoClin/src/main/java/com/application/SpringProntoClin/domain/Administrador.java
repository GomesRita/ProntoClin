package com.application.SpringProntoClin.domain;

import com.application.SpringProntoClin.DTO.RequestAdministrador;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "administrador")
@Table(name = "administrador")
@EqualsAndHashCode(of = "id")
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "administrador_seq_generator")
    @SequenceGenerator(name = "administrador_seq_generator", sequenceName = "administrador_SEQ", allocationSize = 1)
    private Long id;

    @Column
    private String nome;

    @Column(unique = true)
    private String cpf;
    private String senha;
    private String email;

    public Administrador(RequestAdministrador requestAdministrador) {
        this.id = requestAdministrador.id();
        this.nome = requestAdministrador.nome();
        this.cpf = requestAdministrador.cpf();
        this.senha = requestAdministrador.senha();
        this.email = requestAdministrador.email();

    }

}
