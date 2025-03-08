package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.Prontuario;

import java.util.Date;

public record RequestProntuario(Long idprontuario, String historicomedico, String alergias, Date ultimaatualziacao, String queixaprincipal, String diagnostico, String situacaotratamento, String prescricaomedica) {

    public RequestProntuario(Prontuario prontuario) {
        this(
                prontuario.getIdProntuario(),
                prontuario.getHistoricomedico(),
                prontuario.getAlergias(),
                prontuario.getUltimaAtualizacao(),
                prontuario.getQueixaprinciapal(),
                prontuario.getDiagnostico(),
                prontuario.getSituacaotramento(),
                prontuario.getPrescricaomedica());
    }


}
