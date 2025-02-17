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
@EqualsAndHashCode(of = "idprofissionalsaude")
public class ProfissionalSaude  {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profissionalsaude_seq_generator")
    @SequenceGenerator(name = "profissionalsaude_seq_generator", sequenceName = "profissionalsaude_SEQ", allocationSize = 1)
    private Long idprofissionalsaude ;
    
    private String nomeprofissionalsaude ;
    
    @Column(unique = true)
    private String cpfprofissionalsaude ;
    private String especialidademedica;
    
    private String telefoneprofissionalsaude ;

    @Column(unique = true)
    private String CRM;
    private String senha;

    @Column(unique = true)
    private String email;

    public ProfissionalSaude(RequestProfissionalSaude requestProfissionalSaude) {
        this.idprofissionalsaude = requestProfissionalSaude.idProfissionalSaude();
        this.nomeprofissionalsaude = requestProfissionalSaude.nomeProfissionalSaude();
        this.cpfprofissionalsaude = requestProfissionalSaude.cpfProfissionalSaude();
        this.especialidademedica = requestProfissionalSaude.especialidadeMedica();
        this.telefoneprofissionalsaude = requestProfissionalSaude.telefoneProfissionalSaude();
        this.CRM = requestProfissionalSaude.CRM();
        this.senha = requestProfissionalSaude.senha();
        this.email = requestProfissionalSaude.email();
    }
}
