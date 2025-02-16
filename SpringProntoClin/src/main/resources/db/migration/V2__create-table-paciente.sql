CREATE  SEQUENCE paciente_seq START WITH 1 INCREMENT BY 1;


CREATE TABLE IF NOT EXISTS paciente (
	idpaciente bigint DEFAULT nextval('paciente_seq') PRIMARY KEY,
	nomepaciente varchar(100) NOT NULL,
	nomesocial varchar(100) NOT NULL,
	telefonepaciente int NOT NULL,
	cpfpaciente varchar(100) NOT NULL,
	datanascimento date NOT NULL,
	emailpaciente varchar(100) NOT NULL,
	senha varchar(100) NOT NULL
);