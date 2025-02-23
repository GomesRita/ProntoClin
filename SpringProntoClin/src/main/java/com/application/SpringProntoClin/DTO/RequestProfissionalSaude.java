package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.ProfissionalSaude;

public record RequestProfissionalSaude(Long idProfissionalSaude, String nomeProfissionalSaude, String cpfProfissionalSaude, String especialidadeMedica, String telefoneProfissionalSaude, String CRM, String email, String senha, String userrole) {

    public RequestProfissionalSaude(ProfissionalSaude profissionalSaude) {
        this(
                profissionalSaude.getIduser(),
                profissionalSaude.getNomeprofissionalsaude(),
                profissionalSaude.getCpfprofissionalsaude(),
                profissionalSaude.getEspecialidademedica(),
                profissionalSaude.getTelefoneprofissionalsaude(),
                profissionalSaude.getCRM(),
                profissionalSaude.getEmail(),
                profissionalSaude.getSenha(),
                profissionalSaude.getUserrole());
    }

}
