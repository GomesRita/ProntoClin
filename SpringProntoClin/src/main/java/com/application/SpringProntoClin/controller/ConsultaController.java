package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestConsulta;
import com.application.SpringProntoClin.domain.Consulta;
import com.application.SpringProntoClin.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaRepository consultaRepository;

    @PostMapping
    public ResponseEntity<Consulta> registrarConsulta(@RequestBody RequestConsulta consulta) {
        System.out.println("Consulta " + consulta);
        Consulta newConsulta = new Consulta(consulta);
        consultaRepository.save(newConsulta);
        System.out.println("New Consulta " + newConsulta);
        return new ResponseEntity<>(newConsulta, HttpStatus.CREATED);
    }
    @GetMapping("/{idconsulta}")
    public Consulta getConsulta(@PathVariable Long idconsulta) {
        return consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
    }

    @PutMapping("/{idconsulta}")
    public Consulta getConsulta(@PathVariable Long idconsulta, @RequestBody Consulta consulta) {
        Consulta Consulta = consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        Consulta.setDataconsulta(consulta.getDataconsulta());

        return consultaRepository.save(Consulta);
    }

    @DeleteMapping("/{idconsulta}")
    public ResponseEntity<Void> deleteConsulta(@PathVariable Long idconsulta) {
        Consulta consulta = consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        consultaRepository.delete(consulta);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
