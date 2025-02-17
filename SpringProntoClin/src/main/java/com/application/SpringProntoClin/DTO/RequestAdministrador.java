package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.Administrador;

public record RequestAdministrador(Long id, String nome, String cpf, String senha, String email) {

    public RequestAdministrador(Administrador administrador) {
        this(administrador.getId(), administrador.getNome(), administrador.getCpf(), administrador.getSenha(), administrador.getEmail());
    }
}
