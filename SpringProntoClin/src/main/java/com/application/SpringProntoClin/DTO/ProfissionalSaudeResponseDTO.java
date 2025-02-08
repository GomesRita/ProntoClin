package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.model.ProfissionalSaude;

public record ProfissionalSaudeResponseDTO(int idProfissionalSaude, String nomeProfissionalSaude, String cpfProfissionalSaude, String especialidadeMedica, String telefoneProfissionalSaude, String CRM, String senha, String email) {

    public ProfissionalSaudeResponseDTO(ProfissionalSaude profissionalSaude) {
        this(profissionalSaude.getIdProfissionalSaude(), profissionalSaude.getNomeProfissionalSaude(), profissionalSaude.getCpfProfissionalSaude(), profissionalSaude.getEspecialidadeMedica(), profissionalSaude.getTelefoneProfissionalSaude(), profissionalSaude.getCRM(), profissionalSaude.getSenha(), profissionalSaude.getEmail());
    }
}
