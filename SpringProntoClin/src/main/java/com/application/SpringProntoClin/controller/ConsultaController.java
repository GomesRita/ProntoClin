package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestConsulta;
import com.application.SpringProntoClin.domain.Agenda;
import com.application.SpringProntoClin.domain.Consulta;
import com.application.SpringProntoClin.domain.Paciente;
import com.application.SpringProntoClin.domain.ProfissionalSaude;
import com.application.SpringProntoClin.repository.AgendaRepository;
import com.application.SpringProntoClin.repository.ConsultaRepository;
import com.application.SpringProntoClin.repository.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private ProfissionalSaudeRepository profissionalSaudeRepository;
    @Autowired
    private AgendaRepository agendaRepository;

    @PostMapping
    public ResponseEntity<?> registrarConsulta(@RequestBody RequestConsulta consulta) {
        // Busca o profissional de saúde pelo nome
        ProfissionalSaude profissional = profissionalSaudeRepository.findProfissionalSaudeByNomeprofissionalsaude(consulta.nomeProfissionalSaude())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        // Verifica se o profissional está ativo
        if (Objects.equals(profissional.getStatus(), "INATIVO")) {
            return ResponseEntity.badRequest().body("Profissional não está ativo.");
        }

        // Obtém o paciente autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Paciente paciente = (Paciente) authentication.getPrincipal();

        // Verifica se o paciente já tem uma consulta agendada para o mesmo dia
        if (!consultaRepository.findConsultaByIdpacienteAndDataconsulta(paciente.getIduser(), consulta.dataConsulta()).isEmpty()) {
            return ResponseEntity.badRequest().body("Paciente já possui uma consulta agendada para este dia");
        }

        // Verifica se o horário está disponível na agenda do profissional
        Optional<Agenda> agendaExistente = agendaRepository.findByProfissionalSaudeAndDataconsulta(profissional, consulta.dataConsulta());

        if (agendaExistente.isPresent()) {
            Agenda agenda = agendaExistente.get();
            if (agenda.getSituacao().equals("indisponivel")) {
                return ResponseEntity.badRequest().body("Profissional não disponível para esta data e hora");
            }
            // Marca o horário como indisponível
            agenda.setSituacao("indisponivel");
            agendaRepository.save(agenda);

            // Cria e salva a nova consulta
            Consulta newConsulta = new Consulta();
            newConsulta.setIdpaciente(paciente.getIduser());
            newConsulta.setNomepaciente(paciente.getNomepaciente());
            newConsulta.setNomesocial(paciente.getNomesocial());
            newConsulta.setIdprofissionalsaude(profissional.getIduser());
            newConsulta.setNomeprofissionalsaude(profissional.getNomeprofissionalsaude());
            newConsulta.setEspecialidademedica(profissional.getEspecialidademedica());
            newConsulta.setDataconsulta(consulta.dataConsulta());

            consultaRepository.save(newConsulta);

            return new ResponseEntity<>(newConsulta, HttpStatus.CREATED);
        } else {
            return ResponseEntity.badRequest().body("Horário não encontrado na agenda do profissional");
        }
    }

    @GetMapping("/profissional/consultas")
    public ResponseEntity<List<Agenda>> getConsultasByProfissionalId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        List<Agenda> agenda = agendaRepository.findAgendaByProfissionalSaude(profissionalSaude);
        if (agenda.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(agenda);
    }

    @GetMapping("/agendaprofissional")
    public ResponseEntity<List<Agenda>> getAgendasByProfissional(@RequestBody ProfissionalSaude profissionalSaude) {
        ProfissionalSaude profissional = profissionalSaudeRepository.findProfissionalSaudeByNomeprofissionalsaude(profissionalSaude.getNomeprofissionalsaude()).orElseThrow(RuntimeException::new);
        System.out.println(profissional);
        List<Agenda> agenda = agendaRepository.findAgendaBySituacaoAndProfissionalSaude("disponivel", profissional);
        if (agenda.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(agenda);
    }


    @GetMapping("/paciente/consultas")
    public ResponseEntity<List<Consulta>> getConsultasByPacienteId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        List<Consulta> consultas = consultaRepository.findConsultaByIdpaciente(paciente.getIduser());
        if (consultas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(consultas);
    }

    @PutMapping("/{idconsulta}")
    public ResponseEntity<Object> getConsulta(@PathVariable Long idconsulta, @RequestBody Consulta consulta) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        Consulta newConsulta = consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        if (!newConsulta.getIdpaciente().equals(paciente.getIduser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        newConsulta.setDataconsulta(consulta.getDataconsulta());
        return ResponseEntity.ok().body(consultaRepository.save(newConsulta));
    }

    @DeleteMapping("/{idconsulta}")
    public ResponseEntity<Void> deleteConsulta(@PathVariable Long idconsulta) {
        Consulta consulta = consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        if (!consulta.getIdpaciente().equals(paciente.getIduser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        consultaRepository.delete(consulta);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
