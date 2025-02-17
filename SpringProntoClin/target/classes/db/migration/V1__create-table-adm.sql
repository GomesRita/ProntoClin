CREATE TABLE IF NOT EXISTS "tbAdministrador" (
	"idAdministrador" bigint NOT NULL,
	"nomeAdministrador" serial NOT NULL UNIQUE,
	"cpfAdministrador" varchar(100) NOT NULL,
	"senha" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	PRIMARY KEY ("idAdministrador")
);