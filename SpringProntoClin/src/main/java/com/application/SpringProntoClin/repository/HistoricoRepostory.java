package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.domain.HistoricoMedico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoRepostory extends JpaRepository<HistoricoMedico, Long>{

}
