package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.domain.Diagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosticoRepository extends JpaRepository<Diagnostico, Long> {

}
