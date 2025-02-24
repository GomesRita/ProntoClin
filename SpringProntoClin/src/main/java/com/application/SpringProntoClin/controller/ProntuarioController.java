package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestProntuario;
import com.application.SpringProntoClin.domain.Prontuario;
import com.application.SpringProntoClin.repository.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/prontuarios")
public class ProntuarioController {

    @Autowired
    private final prontuarioRepository prontuarioRepository;

    @GetMapping
    public List<Prontuario> listarProntuarios() {
        return prontuarioRepository.findAll();
    }

    @PostMapping
    public Prontuario criarProntuario(@RequestBody RequestProntuario request) {
        Prontuario prontuario = new Prontuario(request.getDescricao(), request.getPacienteId());
        return prontuarioRepository.save(prontuario);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Prontuario> buscarProntuario(@PathVariable Long id) {
        return  prontuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<void> deletarProntuario(@PathVariable Long id) {
        if (prontuarioRepository.existsById(id)) {
            prontuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();

    }
}