CREATE  SEQUENCE  administrador_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS administrador (
	id bigint DEFAULT nextval('administrador_seq')PRIMARY KEY,
	nome varchar(100) NOT NULL UNIQUE,
	cpf varchar(100) NOT NULL,
	senha varchar(100) NOT NULL,
	email varchar(100) NOT NULL
);