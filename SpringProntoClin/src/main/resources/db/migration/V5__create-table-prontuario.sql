CREATE TABLE IF NOT EXISTS "tbProntuario" (
	"idProntuario" int NOT NULL UNIQUE,
	"idPaciente" int NOT NULL,
	"dataCriacao" date NOT NULL,
	"dataUltimaAtualizacao" date NOT NULL,
	PRIMARY KEY ("idProntuario")
);