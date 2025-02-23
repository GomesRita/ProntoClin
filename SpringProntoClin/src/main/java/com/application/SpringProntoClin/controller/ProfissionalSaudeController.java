package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestProfissionalSaude;
import com.application.SpringProntoClin.domain.ProfissionalSaude;
import com.application.SpringProntoClin.repository.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profSaude")
public class ProfissionalSaudeController {

    @Autowired
    private ProfissionalSaudeRepository profissionalSaudeRepository;

    @GetMapping("/{idprofissionalSaude}")
    public ProfissionalSaude getProfissionalSaude(@PathVariable Long idprofissionalSaude) {
        return profissionalSaudeRepository.findById(idprofissionalSaude).orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));
    }

    @PutMapping("/{idprofissionalSaude}")
    public ProfissionalSaude updateProfissionalSaude(@PathVariable Long idprofissionalSaude, @RequestBody ProfissionalSaude profissionalSaude) {
        ProfissionalSaude profSaude = profissionalSaudeRepository.findById(idprofissionalSaude).orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));
        profSaude.setEmail(profissionalSaude.getEmail());
        profSaude.setSenha(profissionalSaude.getSenha());
        profSaude.setEspecialidademedica(profissionalSaude.getEspecialidademedica());
        profSaude.setTelefoneprofissionalsaude(profissionalSaude.getTelefoneprofissionalsaude());
        profSaude.setStatus("ATIVO");
        return profissionalSaudeRepository.save(profSaude);
    }

    @DeleteMapping("/{idprofissionalSaude}")
    public ProfissionalSaude deleteProfSaude(@PathVariable Long idprofissionalSaude) {
        ProfissionalSaude profSaude = profissionalSaudeRepository.findById(idprofissionalSaude).orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));
        profSaude.setStatus("INATIVO");

        return profissionalSaudeRepository.save(profSaude);
    }
}
