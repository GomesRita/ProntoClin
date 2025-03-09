package com.application.SpringProntoClin.DTO;

import com.application.SpringProntoClin.domain.Prontuario;

import java.util.Date;

public record RequestProntuario(Long idprontuario, String cpfpaciente,Long numeroprontuario,String historicomedico, String alergias, Date ultimaatualizacao, String queixaprincipal, String diagnostico, String situacaotratamento, String prescricaomedica) {

    public RequestProntuario(Prontuario prontuario) {
        this(
                prontuario.getIdProntuario(),
                prontuario.getCpfpaciente(),
                prontuario.getNumeroprontuario(),
                prontuario.getHistoricomedico(),
                prontuario.getAlergias(),
                prontuario.getUltimaatualizacao(),
                prontuario.getQueixaprinciapal(),
                prontuario.getDiagnostico(),
                prontuario.getSituacaotramento(),
                prontuario.getPrescricaomedica());
    }


}
