package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.model.Administrador;

public record AdministradorDTO(Long idAdministrador, String nomeAdministrador, String cpfAdministrador, String senha, String email) {

    public AdministradorDTO(Administrador administrador) {
        this(administrador.getIdAdministrador(), administrador.getNomeAdministrador(), administrador.getCpfAdministrador(), administrador.getSenha(), administrador.getEmail());
    }


}
