CREATE  SEQUENCE prontuario_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS prontuario (
	idprontuario bigint DEFAULT nextval('prontuario_seq') PRIMARY KEY,
	idpaciente int NOT NULL,
	datacriacao date NOT NULL,
	dataultimaatualizacao date NOT NULL,
    CONSTRAINT idpaciente
        FOREIGN KEY (idpaciente)
        REFERENCES paciente(idpaciente)
        ON DELETE CASCADE
);