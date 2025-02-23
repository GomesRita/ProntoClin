package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestPaciente;
import com.application.SpringProntoClin.domain.Paciente;
import com.application.SpringProntoClin.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping("/{idPaciente}")
    public Paciente getPaciente(@PathVariable Long idPaciente) {
        return pacienteRepository.findById(idPaciente).orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
    }

    @PutMapping("/{idPaciente}")
    public Paciente updatePaciente(@PathVariable Long idPaciente, @RequestBody Paciente paciente) {
        Paciente patient = pacienteRepository.findById(idPaciente).orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        patient.setEmail(paciente.getEmail());
        patient.setSenha(paciente.getSenha());
        patient.setNomesocial(paciente.getNomesocial());
        patient.setTelefonepaciente(paciente.getTelefonepaciente());

        return pacienteRepository.save(patient);
    }
}
