package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.model.Administrador;
import com.application.SpringProntoClin.repository.AdmRepository;
import com.application.SpringProntoClin.service.AdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adm")
public class AdmController {

    @Autowired
    private AdmRepository admRepository;

    @PostMapping
    public ResponseEntity<String> save(@RequestBody Administrador administrador){
        admRepository.save(administrador);
        return new ResponseEntity<>("Requisição recebida", HttpStatus.CREATED);
    }
    /*
    @GetMapping
    public ResponseEntity<String> test(){
        return ResponseEntity.status(HttpStatus.CREATED).body("Requisição recebida");
    }*/


}
