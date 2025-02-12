CREATE TABLE IF NOT EXISTS "tbProfissionalSaude" (
	"idProfissionalSaude" int NOT NULL UNIQUE,
	"nomeProfissionalSaude" varchar(100) NOT NULL,
	"cpfProfissionalSaude" varchar(100) NOT NULL,
	"especialidadeMedica" varchar(100) NOT NULL,
	"telefone" int NOT NULL,
	"CRM" varchar(100) NOT NULL,
	"senha" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	PRIMARY KEY ("idProfissionalSaude")
);