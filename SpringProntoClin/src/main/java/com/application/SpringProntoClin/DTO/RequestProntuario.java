package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.Prontuario;

public record RequestProntuario(Long idprontuario, String queixaprincipal, String diagnostico,String situacaotratamento, String prescricaomedica) {

    public RequestProntuario(Prontuario prontuario) {
        this(
                prontuario.getIdProntuario(),
                prontuario.getQueixaprinciapal(),
                prontuario.getDiagnostico(),
                prontuario.getSituacaotramento(),
                prontuario.getPrescricaomedica());
    }


}
