package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestAdministrador;
import com.application.SpringProntoClin.DTO.RequestProntuario;
import com.application.SpringProntoClin.domain.*;
import com.application.SpringProntoClin.repository.ConsultaRepository;
import com.application.SpringProntoClin.repository.PacienteRepository;
import com.application.SpringProntoClin.repository.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prontuario")
public class PronturioController {

    @Autowired
    ProntuarioRepository prontuarioRepository;
    @Autowired
    private PacienteRepository pacienteRepository;
    @Autowired
    private ConsultaRepository consultaRepository;

    @PostMapping("/adicionarProntuario")
    public ResponseEntity<?> registerProntuario(@RequestBody Prontuario prontuario) {
        // Verifica se o paciente existe
        Paciente paciente = pacienteRepository.findPacienteByIduser(prontuario.getPaciente().getIduser());
        if (paciente == null) {
            return ResponseEntity.badRequest().body("Paciente não encontrado");
        }

        // Verifica se a consulta existe
        Consulta consulta = consultaRepository.findConsultaByIdconsulta(prontuario.getConsulta().getIdconsulta());
        if (consulta == null) {
            return ResponseEntity.badRequest().body("Consulta não encontrada");
        }

        // Cria um novo prontuário com os dados recebidos e os objetos encontrados
        Prontuario newProntuario = new Prontuario();
        newProntuario.setPaciente(paciente);  // Associa o paciente
        newProntuario.setConsulta(consulta);  // Associa a consulta
        newProntuario.setQueixaprinciapal(prontuario.getQueixaprinciapal());
        newProntuario.setDiagnostico(prontuario.getDiagnostico());
        newProntuario.setSituacaotramento(prontuario.getSituacaotramento());
        newProntuario.setPrescricaomedica(prontuario.getPrescricaomedica());

        // Salva o prontuário no banco
        prontuarioRepository.save(newProntuario);

        // Retorna a resposta com o prontuário criado
        return ResponseEntity.ok().body(newProntuario);
    }


    @GetMapping("/meuprontuario")
    public ResponseEntity<?> getMeuprontuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        Prontuario prontuario = prontuarioRepository.findProntuarioByPaciente_Iduser(paciente.getIduser());
        if(prontuario == null) {
            return ResponseEntity.badRequest().body("Prontuário não encontrado");
        }
        return ResponseEntity.ok().body(prontuario);
    }

    @GetMapping("/prontuarioPaciente")
    public ResponseEntity<?> getProntuarioPaciente(@RequestParam Long idpaciente) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        Paciente newPaciente = pacienteRepository.findPacienteByIduser(idpaciente);
        if (newPaciente == null) {
            return ResponseEntity.badRequest().body("Paciente não encontrado");
        }
        Prontuario newProntuario = prontuarioRepository.findProntuarioByPaciente_Iduser(newPaciente.getIduser());
        if (newProntuario == null) {
            return ResponseEntity.badRequest().body("Prontuário não encontrado");
        }
        List<Consulta> consultas = consultaRepository.findConsultaByIdconsultaAndIdprofissionalsaude(
                newProntuario.getConsulta().getIdconsulta(),
                profissionalSaude.getIduser()
        );
        if (consultas == null || consultas.isEmpty()) {
            return ResponseEntity.badRequest().body("Você não tem acesso a este prontuário");
        }
        List<Prontuario> listaProntuario = prontuarioRepository.findProntuarioByPaciente_Cpfpaciente(newPaciente.getCpfpaciente());
        return ResponseEntity.ok().body(listaProntuario);
    }


    @PutMapping("/atualizarProntuario")
    public ResponseEntity<?> atualizarProntuario(@RequestBody Prontuario prontuario) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        Paciente newPaciente = pacienteRepository.findPacienteByIduser(prontuario.getPaciente().getIduser());
        if(newPaciente == null) {
            return ResponseEntity.badRequest().body("Paciente não encontrado");
        }
        Prontuario newProntuario = prontuarioRepository.findProntuarioByPaciente_Iduser(newPaciente.getIduser());
        if(newProntuario == null) {
            return ResponseEntity.badRequest().body("Prontuário não encontrado");
        }
        List<Consulta> consultas = consultaRepository.findConsultaByIdconsultaAndIdprofissionalsaude(
                prontuario.getConsulta().getIdconsulta(),
                profissionalSaude.getIduser()
        );
        if (consultas == null || consultas.isEmpty()) {
            return ResponseEntity.badRequest().body("Você não tem acesso a este prontuário");
        }
        newProntuario.setQueixaprinciapal(prontuario.getQueixaprinciapal());
        newProntuario.setDiagnostico(prontuario.getDiagnostico());
        newProntuario.setPrescricaomedica(prontuario.getPrescricaomedica());
        newProntuario.setSituacaotramento(prontuario.getSituacaotramento());
        prontuarioRepository.save(newProntuario);
        return ResponseEntity.ok().body(prontuario);
    }

}
