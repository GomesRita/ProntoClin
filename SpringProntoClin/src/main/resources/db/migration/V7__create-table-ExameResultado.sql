CREATE TABLE IF NOT EXISTS "tbExamesResultados" (
	"idExameResultado" int NOT NULL UNIQUE,
	"idProntuario" int NOT NULL,
	"tipoExame" varchar(100) NOT NULL,
	"dataRealizacao" date,
	"exame" varchar(255),
	"resultado" varchar(255),
	PRIMARY KEY ("idExameResultado"),
    CONSTRAINT "idProntuario" 
        FOREIGN KEY ("idProntuario")
        REFERENCES "tbProntuario"("idProntuario") 
        ON DELETE CASCADE 
);