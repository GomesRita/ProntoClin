import { useState } from "react";
import { getToken } from "../../controle/cookie";
import axios from "axios";
import { Badge, Descriptions, DescriptionsProps, message, Input, Button, Form, Select } from "antd";
import dayjs from "dayjs";
import Search from "antd/es/input/Search";

function ProntuarioPaciente() {
  const [, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
          children: formatDate(userData.paciente.datanascimento),
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

  // Função para ativar o modo de edição
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Função para salvar os dados editados
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (token) {
        const {
          dataconsulta,
          cpfpaciente,
          historicomedico,
          alergias,
          queixaprinciapal,
          diagnostico,
          situacaotramento,
          prescricaomedica,
        } = userData; 
        const dataconsultaFormatted = dayjs(dataconsulta).format('YYYY-MM-DDTHH:mm:ss');
        const response = await axios.post(
          `http://localhost:8081/prontuario/atualizarProntuario`,
          {
            numeroprontuario: userData.numeroprontuario,
            consulta: {
              dataconsulta: dataconsultaFormatted
            },
            paciente: { 
              cpfpaciente: cpfpaciente
            },
            historicomedico, 
            alergias, 
            queixaprinciapal, 
            diagnostico, 
            situacaotramento, 
            prescricaomedica, 
            ultimaatualizacao: dayjs(dataconsulta).toISOString()
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data); 
        message.success("Prontuário atualizado com sucesso!");
        setIsEditing(false); 
      } else {
        setError("Token não encontrado");
      }
    } catch (err) {
      setError("Erro ao salvar dados");
      message.error("Erro ao salvar dados");
    } finally {
      setLoading(false);
    }
  };

 
  const handleChange = (field: string, value: any) => {
    setUserData((prevState: any) => ({
      ...prevState,
      [field]: value, 
    }));
  };

  return (
    <>
      <Search
        placeholder="Pesquisar número do prontuário"
        onSearch={onSearch}
        style={{ width: 300 }}
      />
      <h4 style={{ color: "#262626" }}>Prontuário Clínico</h4>

     
      {isEditing ? (
        <Form layout="vertical">
          <Form.Item label="Data consulta">
            <Input
              value={userData.dataconsulta}
              onChange={(e) => handleChange("dataconsulta", e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="CPF Paciente">
            <Input
              value={userData.paciente.cpfpaciente}
              readOnly
            />
          </Form.Item>
          <Form.Item label="Histórico Médico">
            <Input
              value={userData.historicomedico}
              onChange={(e) => handleChange("historicomedico", e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="Alergias">
            <Input
              value={userData.alergias}
              onChange={(e) => handleChange("alergias", e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="Queixa Principal">
            <Input.TextArea
              value={userData.queixaprinciapal}
              onChange={(e) => handleChange("queixaprincipal", e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="Diagnóstico">
            <Input.TextArea
              value={userData.diagnostico}
              onChange={(e) => handleChange("diagnostico", e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="Situação Tratamento">
            <Select
              value={userData.situacaotramento}
              onChange={(value) => handleChange("situacaotramento", value)} 
            >
              <Select.Option value="Em andamento">Em andamento</Select.Option>
              <Select.Option value="Finalizado">Finalizado</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Prescrição Médica">
            <Input.TextArea
              value={userData.prescricaomedica}
              onChange={(e) => handleChange("prescricaomedica", e.target.value)} 
            />
          </Form.Item>
          <Button type="primary" onClick={handleSave}>
            Salvar Alterações
          </Button>
        </Form>
      ) : (
        <Descriptions bordered items={items} />
      )}

      {!isEditing && userData && (
        <Button type="primary" onClick={handleEdit}>
          Editar Prontuário
        </Button>
      )}
    </>
  );
}

export default ProntuarioPaciente;
