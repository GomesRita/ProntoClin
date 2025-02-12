package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.model.PlanoTratamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanoTratamentoRepository extends JpaRepository<PlanoTratamento, Long>{
    
}
