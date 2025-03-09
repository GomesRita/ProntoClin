import { useState } from "react";
import { getToken } from "../../controle/cookie";
import axios from "axios";
import { Badge, Descriptions, DescriptionsProps, message} from "antd";
import dayjs from "dayjs";
import Search from "antd/es/input/Search";

function ProntuarioPaciente() {
  const [, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [, setError] = useState<string | null>(null);

  const formatDate = (date: string | Date | undefined) => {
    if (date) {
      return dayjs(date).format("DD/MM/YYYY");
    }
    return "Não disponível";
  };

  const items: DescriptionsProps["items"] = userData
    ? [
        {
          key: "1",
          label: "Número prontuário",
          children: userData.numeroprontuario || "Não disponível",
          span: 1,
        },
        {
          key: "2",
          label: "Última atualização",
          children: formatDate(userData.ultimaatualizacao) || "Não disponível",
          span: 3,
        },
        {
          key: "3",
          label: "Paciente",
          children: userData.paciente.nomepaciente || "Não disponível",
        },
        {
          key: "4",
          label: "Nome Social",
          children: userData.paciente.nomesocial || "Não disponível",
        },
        {
          key: "5",
          label: "CPF",
          children: userData.paciente.cpfpaciente || "Não disponível",
        },
        {
          key: "6",
          label: "Data Nascimento",
          children: formatDate(userData.paciente.userDatanascimento),
        },
        {
          key: "7",
          label: "Sexo",
          children: userData.paciente.sexopaciente || "Não disponível",
        },
        {
          key: "9",
          label: "Telefone",
          children: userData.paciente.telefonepaciente || "Não disponível",
        },
        {
          key: "10",
          label: "Situação Tratamento",
          children: (
            <Badge
              status={
                userData.situacaotramento === "Em andamento"
                  ? "processing"
                  : userData.situacaotramento === "Finalizado"
                  ? "success"
                  : "default"
              }
              text={userData.situacaotramento || "Não disponível"}
            />
          ),
          span: 4,
        },
        {
          key: "11",
          label: "Histórico Médico",
          children: userData.historicomedico || "Não disponível",
          span: 4,
        },
        {
          key: "12",
          label: "Alergias",
          children: userData.alergias || "Não disponível",
          span: 4,
        },
        {
          key: "13",
          label: "Prescrição Médica",
          children: userData.prescricaomedica || "Não disponível",
          span: 4,
        },
      ]
    : [];

  // Função que será chamada quando o número do prontuário for pesquisado
  const onSearch = async (value: string) => {
    setLoading(true);
    try {
      const token = getToken();
      if (token) {
        const response = await axios.get(
          `http://localhost:8081/prontuario/prontuarioPaciente?numeroprontuario=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUserData(response.data);
      } else {
        setError("Token não encontrado");
      }
    } catch (err) {
      setError("Erro ao carregar dados");
      message.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Search
        placeholder="Pesquisar número do prontuário"
        onSearch={onSearch} 
        style={{ width: 300 }}
      />
      <h4 style={{ color: "#262626" }}>Prontuário Clínico</h4>
      <Descriptions bordered items={items} />
    </>
  );
}

export default ProntuarioPaciente;
