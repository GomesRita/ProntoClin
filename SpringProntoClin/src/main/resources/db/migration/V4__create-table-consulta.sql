
CREATE TABLE IF NOT EXISTS "tbConsulta" (
	"idConsulta" int NOT NULL UNIQUE,
	"idPaciente" int NOT NULL,
	"idProfissionalSaude" int NOT NULL,
	"nomeProfissionalSaude" varchar(100) NOT NULL,
	"nomePaciente" varchar(100) NOT NULL,
	"dataConsulta" timestamp with time zone NOT NULL,
	"especialidadeMedica" varchar(100) NOT NULL,
	PRIMARY KEY ("idConsulta"),
    CONSTRAINT "dPaciente"
        FOREIGN KEY ("idPaciente")
        REFERENCES "tbPaciente"("idPaciente") 
        ON DELETE CASCADE,
    CONSTRAINT "idProfissionalSaude" 
        FOREIGN KEY ("idProfissionalSaude")
        REFERENCES "tbProfissionalSaude"("idProfissionalSaude")
        ON DELETE CASCADE 
);
