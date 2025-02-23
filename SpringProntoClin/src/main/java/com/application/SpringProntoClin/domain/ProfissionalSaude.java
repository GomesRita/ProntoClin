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
    
    private String nomeprofissionalsaude ;
    
    @Column(unique = true)
    private String cpfprofissionalsaude ;
    private String especialidademedica;
    
    private String telefoneprofissionalsaude ;

    @Column(unique = true)
    private String CRM;

    public ProfissionalSaude(RequestProfissionalSaude requestProfissionalSaude) {
        super(requestProfissionalSaude.email(), requestProfissionalSaude.senha(), requestProfissionalSaude.userrole());
        this.nomeprofissionalsaude = requestProfissionalSaude.nomeProfissionalSaude();
        this.cpfprofissionalsaude = requestProfissionalSaude.cpfProfissionalSaude();
        this.especialidademedica = requestProfissionalSaude.especialidadeMedica();
        this.telefoneprofissionalsaude = requestProfissionalSaude.telefoneProfissionalSaude();
        this.CRM = requestProfissionalSaude.CRM();
    }
}
