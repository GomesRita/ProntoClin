package com.application.SpringProntoClin.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.application.SpringProntoClin.domain.ExameFisico;
import org.springframework.stereotype.Repository;

@Repository
public interface ExameFisicoRepository extends JpaRepository<ExameFisico, Long>{
    
}
