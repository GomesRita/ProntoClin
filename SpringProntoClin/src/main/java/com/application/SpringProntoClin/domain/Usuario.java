package com.application.SpringProntoClin.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq_generator")
    @SequenceGenerator(name = "usuario_seq_generator", sequenceName = "usuario_SEQ", allocationSize = 1)
    private Long iduser;

    private String email;
    private String senha;
    private String userrole;

    public Usuario(String email, String senha, String userrole) {
        this.email = email;
        this.senha = senha;
        this.userrole = userrole;

    }
}
