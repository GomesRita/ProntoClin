CREATE TABLE IF NOT EXISTS "tbPaciente" (
	"idPaciente" int NOT NULL UNIQUE,
	"nomePaciente" varchar(100) NOT NULL,
	"nomeSocial" varchar(100) NOT NULL,
	"telefonePaciente" int NOT NULL,
	"cpfPaciente" varchar(100) NOT NULL,
	"dataNascimento" date NOT NULL,
	"email" varchar(100) NOT NULL,
	"senha" varchar(100) NOT NULL,
	PRIMARY KEY ("idPaciente")
);