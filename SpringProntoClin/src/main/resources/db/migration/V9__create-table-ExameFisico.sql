CREATE TABLE IF NOT EXISTS "tbExameFisico" (
	"idExameFisico" int NOT NULL UNIQUE,
	"idProntuario" int NOT NULL,
	"pressaoArterial" double precision NOT NULL,
	"freqCardiaca" double precision NOT NULL,
	"temperatura" double precision NOT NULL,
	"peso" double precision NOT NULL,
	"altura" bigint NOT NULL,
	PRIMARY KEY ("idExameFisico"),
	CONSTRAINT "idProntuario" 
        FOREIGN KEY ("idProntuario")
        REFERENCES "tbProntuario"("idProntuario") 
        ON DELETE CASCADE 
);