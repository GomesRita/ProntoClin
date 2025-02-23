package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.Administrador;

public record RequestAdministrador(Long iduser, String nome, String cpf, String email, String senha, String userrole) {

    public RequestAdministrador(Administrador administrador) {
        this(
                administrador.getIduser(),
                administrador.getNome(),
                administrador.getCpf(),
                administrador.getEmail(),
                administrador.getSenha(),
                administrador.getUserrole());
    }
}
