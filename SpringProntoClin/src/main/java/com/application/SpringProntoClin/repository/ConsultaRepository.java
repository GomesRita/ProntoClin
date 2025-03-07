package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.domain.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long>{

    Optional<Consulta> findConsultaByDataconsulta(Date date);
    List<Consulta> findConsultaByIdprofissionalsaude(Long idprofissionalsaude);
    List<Consulta> findConsultaByIdpaciente(Long idpaciente);
    List<Consulta> findConsultaByIdpacienteAndDataconsulta(Long idpaciente, Date dataConsulta);
    List<Consulta> findConsultaByIdprofissionalsaudeAndDataconsulta(Long idprofissionalsaude, Date dataConsulta);

}
