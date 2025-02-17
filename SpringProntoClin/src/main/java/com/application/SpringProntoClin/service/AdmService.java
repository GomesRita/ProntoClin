package com.application.SpringProntoClin.service;


import com.application.SpringProntoClin.DTO.AdministradorDTO;
import com.application.SpringProntoClin.model.Administrador;
import com.application.SpringProntoClin.repository.AdmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdmService {

    @Autowired
    private AdmRepository admRepository;

    public Administrador saveAdm(Administrador adm) {
        return admRepository.save(adm);
    }

    public Administrador updateAdm(Administrador administrador, Long idAdministrador){
        administrador = admRepository.findById(idAdministrador).orElseThrow();
        return admRepository.save(administrador);

    }
    public Administrador getAdm(Administrador administrador, Long idAdministrador){
        return admRepository.findById(idAdministrador).orElseThrow();
    }


}
