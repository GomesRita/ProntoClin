package com.application.SpringProntoClin.domain;

import com.application.SpringProntoClin.DTO.RequestProfissionalSaude;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "profissionalsaude")
@Table(name = "profissionalsaude")
@PrimaryKeyJoinColumn(name="iduser")
public class ProfissionalSaude extends Usuario {

    @Column(unique = true)
    private String nomeprofissionalsaude ;

    private String especialidademedica;
    
    private String telefoneprofissionalsaude ;

    @Column(unique = true)
    private String registro;

    private String status;

    public ProfissionalSaude(RequestProfissionalSaude requestProfissionalSaude) {
        super(requestProfissionalSaude.email(), requestProfissionalSaude.senha(), requestProfissionalSaude.userrole());
        this.nomeprofissionalsaude = requestProfissionalSaude.nomeProfissionalSaude();
        this.especialidademedica = requestProfissionalSaude.especialidadeMedica();
        this.telefoneprofissionalsaude = requestProfissionalSaude.telefoneProfissionalSaude();
        this.registro = requestProfissionalSaude.registro();
        this.status = requestProfissionalSaude.status();
    }
}
