CREATE TABLE IF NOT EXISTS "tbDiagnostico" (
	"idDiagnostico" int NOT NULL UNIQUE,
	"idProntuario" int NOT NULL,
	"diagnostico" varchar(100) NOT NULL,
	"outrosDiagnosticos" varchar(100),
	PRIMARY KEY ("idDiagnostico"),
    CONSTRAINT "idProntuario" 
        FOREIGN KEY ("idProntuario")
        REFERENCES "tbProntuario"("idProntuario") 
        ON DELETE CASCADE 
);
