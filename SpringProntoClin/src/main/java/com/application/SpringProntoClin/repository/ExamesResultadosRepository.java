package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.model.ExamesResultados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamesResultadosRepository extends JpaRepository<ExamesResultados, Long> {
    
}
