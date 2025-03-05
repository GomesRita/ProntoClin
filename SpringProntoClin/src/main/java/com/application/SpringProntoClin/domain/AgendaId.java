package com.application.SpringProntoClin.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class AgendaId implements Serializable {

    @Id
    @Column(name = "iduser")
    private Long iduser; // Corresponde ao iduser do ProfissionalSaude

    @Column(name = "dataconsulta")
    private Date dataconsulta;

    // Construtor padrão (obrigatório para o Hibernate)
    public AgendaId() {
    }

    // Construtor com parâmetros (opcional, mas útil)
    public AgendaId(Long iduser, Date dataconsulta) {
        this.iduser = iduser;
        this.dataconsulta = dataconsulta;
    }

    // Implementação de equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AgendaId agendaId = (AgendaId) o;
        return Objects.equals(iduser, agendaId.iduser) &&
                Objects.equals(dataconsulta, agendaId.dataconsulta);
    }

    // Implementação de hashCode
    @Override
    public int hashCode() {
        return Objects.hash(iduser, dataconsulta);
    }
}