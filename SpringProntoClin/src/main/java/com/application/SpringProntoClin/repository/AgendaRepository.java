package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.domain.Agenda;
import com.application.SpringProntoClin.domain.AgendaId;
import com.application.SpringProntoClin.domain.ProfissionalSaude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findAgendaByProfissionalSaude(ProfissionalSaude profissional);

    List<Agenda> findAgendaBySituacaoAndProfissionalSaude(String situacao, ProfissionalSaude profissionalSaude);

    Optional<Agenda> findByProfissionalSaudeAndDataconsulta(ProfissionalSaude profissional, Date date);
}
