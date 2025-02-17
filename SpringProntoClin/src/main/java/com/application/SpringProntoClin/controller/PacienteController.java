package com.application.SpringProntoClin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/paciente")
public class PacienteController {

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        // Mensagem no console
        System.out.println("Método GET /adm/test foi chamado.");

        // Retorna uma resposta com a string
        return ResponseEntity.status(HttpStatus.OK).body("Teste bem-sucedido! Requisição GET recebida.");
    }

}
