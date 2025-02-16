package com.application.SpringProntoClin.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idprofissionalsaude ")
@Entity(name = "profissionalsaude ")
@Table(name = "profissionalsaude ")
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
}
