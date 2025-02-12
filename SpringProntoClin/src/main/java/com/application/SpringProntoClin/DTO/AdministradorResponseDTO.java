package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.model.Administrador;

public record AdministradorResponseDTO(Long idAdministrador, String nomeAdministrador, String cpfAdministrador, String senha, String email) {

    public AdministradorResponseDTO(Administrador administrador) {
        this(administrador.getIdAdministrador(), administrador.getNomeAdministrador(), administrador.getCpfAdministrador(), administrador.getSenha(), administrador.getEmail());
    }
}
