package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.ProfissionalSaude;

public record RequestProfissionalSaude(Long idProfissionalSaude, String nomeProfissionalSaude, String cpfProfissionalSaude, String especialidadeMedica, String telefoneProfissionalSaude, String CRM, String senha, String email) {

    public RequestProfissionalSaude(ProfissionalSaude profissionalSaude) {
        this(profissionalSaude.getIdprofissionalsaude(), profissionalSaude.getNomeprofissionalsaude(), profissionalSaude.getCpfprofissionalsaude(), profissionalSaude.getEspecialidademedica(), profissionalSaude.getTelefoneprofissionalsaude(), profissionalSaude.getCRM(), profissionalSaude.getSenha(), profissionalSaude.getEmail());
    }

}
