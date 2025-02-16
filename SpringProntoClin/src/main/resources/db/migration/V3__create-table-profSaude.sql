CREATE  SEQUENCE profissionalsaude_seq START WITH 1 INCREMENT BY 1;


CREATE TABLE IF NOT EXISTS profissionalsaude (
	 idprofissionalsaude bigint DEFAULT nextval('profissionalsaude_seq') PRIMARY KEY,
	 nomeprofissionalsaude varchar(100) NOT NULL,
	 cpfprofissionalsaude varchar(100) NOT NULL,
	 especialidademedica varchar(100) NOT NULL,
	 telefoneprofissionalsaude  varchar(100) NOT NULL,
	 CRM  varchar(100) NOT NULL,
	 senha  varchar(100) NOT NULL,
	 email  varchar(100) NOT NULL
);