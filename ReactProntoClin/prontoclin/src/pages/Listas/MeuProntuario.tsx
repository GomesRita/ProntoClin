import { useEffect, useState } from "react";
import { getToken } from "../../controle/cookie";
import axios from "axios";
import { Badge, Descriptions, DescriptionsProps, Spin, Alert } from "antd";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

function MeuProntuario() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  dayjs.extend(utc);

  const formatDate = (date: string | Date | undefined) => {
    if (date) {
      return dayjs(date).format('DD/MM/YYYY'); 
    }
    return 'Não disponível';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (token) {
          const response = await axios.get('http://localhost:8081/prontuario/meuprontuario', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setUserData(response.data);
        } else {
          setError('Token não encontrado');
        }
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os dados');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items: DescriptionsProps['items'] = userData ? [
    {
      key: '1',
      label: 'Número prontuário',
      children: userData.numeroprontuario|| 'Não disponível',
      span: 1
    },
    {
      key: '2',
      label: 'Última atualização',
      children: formatDate(userData.ultimaatualizacao) || 'Não disponível',
      span: 3
    },
    {
      key: '3',
      label: 'Paciente',
      children: userData.paciente.nomepaciente || 'Não disponível',
    },
    {
      key: '4',
      label: 'Nome Social',
      children: userData.paciente.nomesocial || 'Não disponível',
    },
    {
      key: '5',
      label: 'CPF',
      children: userData.paciente.cpfpaciente || 'Não disponível',
    },
    {
      key: '6',
      label: 'Data Nascimento',
      children: formatDate(userData.paciente.datanascimento),
    },
    {
      key: '7',
      label: 'Sexo',
      children: userData.paciente.sexopaciente || 'Não disponível',
    },
    {
      key: '9',
      label: 'Telefone',
      children: userData.paciente.telefonepaciente || 'Não disponível',
    },
    {
      key: '10',
      label: 'Situação Tratamento',
      children: <Badge
        status={
          userData.situacaotramento === "Em andamento" ? "processing" :
          userData.situacaotramento === "Finalizado" ? "success" : "default"
        }
        text={userData.situacaotramento || 'Não disponível'}
      />,
      span: 4,
    },
    {
      key: '11',
      label: 'Historico Médico',
      children: userData.historicomedico || 'Não disponível',
      span: 4,
    },
    {
      key: '12',
      label: 'Alergias',
      children: userData.alergias || 'Não disponível',
      span: 4,
    },
    {
      key: '13',
      label: 'Prescrição Médica',
      children: userData.prescricaomedica || 'Não disponível',
      span: 4,
    },
  ] : [];

  if (loading) {
    return <Spin size="large" />; 
  }

  if (error) {
    return <Alert message="Erro" description={error} type="error" showIcon />;
  }

  return (
    <>
      <h4 style={{ color: '#262626' }}>Prontuário Clínico</h4>
      <Descriptions bordered items={items} />
    </>
  );
}

export default MeuProntuario;
