CREATE TABLE IF NOT EXISTS "tbHistoricoMedico" (
	"idHistoricoMedico" int NOT NULL UNIQUE,
	"idProntuario" int NOT NULL,
	"sintomas" varchar(100) NOT NULL,
	"historicoDoenca" varchar(100) NOT NULL,
	"alergias" varchar(100) NOT NULL,
	"medicamentoContinuo" varchar(100) NOT NULL,
	PRIMARY KEY ("idHistoricoMedico"),
    CONSTRAINT "idProntuario" 
        FOREIGN KEY ("idProntuario")
        REFERENCES "tbProntuario"("idProntuario") 
        ON DELETE CASCADE 
);