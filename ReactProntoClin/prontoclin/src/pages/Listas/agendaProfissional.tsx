import { Input, Select, Space, Table, Tag, message } from 'antd';
import { useState, useEffect } from 'react';
import { getToken } from '../../controle/cookie';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

function AgendaProfissional() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterSituacao, setFilterSituacao] = useState<string>(''); 
  const [searchText, setSearchText] = useState<string>(''); 
  dayjs.extend(utc);


  const onSearch2 = (value: string) => {
    setSearchText(value);
  };

  const { Search } = Input;



  interface DataType {
    key: string;
    dataconsulta: string;
    situacao: string;
  }

  const columns = [
    {
      title: 'Data da consulta',
      dataIndex: 'dataconsulta',
      render: (text: string) => {
        const date = dayjs.utc(text);
        return <span>{date.format('DD/MM/YYYY HH:mm')}</span>;
      },
      width: '16%',
    },
    {
      title: 'Situação',
      dataIndex: 'situacao',
      render: (_: string, { situacao }: { situacao: string }) => (
        <Tag color={situacao === 'disponivel' ? 'green' : 'volcano'}>
          {situacao.toUpperCase()}
        </Tag>
      ),
      width: '16%',
    }
  ];

  const filteredData = data.filter(item => {
    const isSituacaoMatch = filterSituacao ? item.situacao === filterSituacao : true;
   
  const isDateMatch = searchText
    ? dayjs.utc(item.dataconsulta).format('DD/MM/YYYY HH:mm').includes(searchText)
    : true;

    return isSituacaoMatch && isDateMatch;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        if (token) {
          const response = await axios.get('http://localhost:8081/consulta/profissional/consultas', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const transformedData = response.data.map((item: any) => ({
            key: item.idagenda,
            dataconsulta: item.dataconsulta,
            situacao: item.situacao,
          }));

          setData(transformedData);
        } else {
          setError('Token não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar os dados');
        message.error('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleFilterChange = (value: string) => {
    setFilterSituacao(value);
  };

  return (
    <>
      <Space direction="horizontal" size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
        <Search
          placeholder="Pesquisar pela data e hora (DD/MM/YYYY HH:mm)"
          onSearch={onSearch2}
          style={{ width: 300 }}
        />
        <Select
          showSearch
          placeholder="Selecione uma situação"
          optionFilterProp="label"
          onChange={handleFilterChange}
          options={[
            {
              value: 'disponivel',
              label: 'Disponível',
            },
            {
              value: 'indisponivel',
              label: 'Indisponível',
            },
          ]}
        />
      </Space>
      {loading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar os dados: {error}</div>}
      <Table<DataType> columns={columns} dataSource={filteredData} />
    </>
  );
}

export default AgendaProfissional;
