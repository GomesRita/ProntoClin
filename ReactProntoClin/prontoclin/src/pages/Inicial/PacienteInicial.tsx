import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../controle/cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Descriptions, Flex, Space } from 'antd';
import CadastroConsulta from '../Cadastro/CadastrarConsulta';
import ConsultasPaciente from '../Listas/ConsultasPaciente';
import MeuProntuario from '../Listas/MeuProntuario';
import EditarPaciente from '../Edit/EditPaciente';

function Paciente() {

   const [userData, setUserData] = useState<any>(null); 
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate();
   const [conteudo, setConteudo] = useState(''); 
   const logout = () => {
       removeToken();
       navigate('/'); 
     };

   const handleClick = (tipo: any) => {
     setConteudo(tipo);
   };

   useEffect(() => {
   
     const fetchData = async () => {
        try {
            const token = getToken(); 
            if (token) {
              const response = await axios.get('http://localhost:8081/paciente/me', {
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
 

   if (loading) {
     return <div>Carregando...</div>;
   }
 
  
   if (error) {
     return <div>Erro ao carregar os dados: {error}</div>;
   }
   
   const formattedDate = new Date(userData.datanascimento).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

   return (
    <>
    
    <Space direction="vertical" size={50} style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        background: '#ffffff', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '80%',
        left: '50%', 
        transform: 'translate(10%,0%)'
         }}>
        <Space direction='horizontal' size="middle" style={{display: 'flex', justifyContent: 'center'}}>
            <Button type="dashed" onClick={() => handleClick('/editPaciente')}>Editar Dados</Button>
            <Button type="dashed" onClick={logout}>Sair</Button>
        </Space>
        <div style={{justifyItems: 'center'}}>
        <Descriptions title="Paciente" style={{ justifyItems: 'center', width: '50%'}}>
            <Descriptions.Item label="Nome" style={{textAlign: 'center'}}>{userData.nomepaciente}</Descriptions.Item>
            <Descriptions.Item label="Nome Social"  style={{textAlign: 'center'}}>{userData.nomesocial}</Descriptions.Item>
            <Descriptions.Item label="Data Nascimento"  style={{textAlign: 'center'}}>{formattedDate}</Descriptions.Item>
            <Descriptions.Item label="Sexo"  style={{textAlign: 'center'}}>{userData.sexopaciente}</Descriptions.Item>
            <Descriptions.Item label="CPF"  style={{textAlign: 'center'}}>{userData.cpfpaciente}</Descriptions.Item>
            <Descriptions.Item label="Telefone"  style={{textAlign: 'center'}}>{userData.telefonepaciente}</Descriptions.Item>
            <Descriptions.Item label="Email" style={{textAlign: 'center'}}>{userData.email}</Descriptions.Item>
        </Descriptions>
        </div>
        <Flex gap="small" wrap style={{ justifyContent: 'center'}}>
            <Button type="primary" onClick={() => handleClick('/cadastroConsulta')}>Agendar Consulta</Button>
            <Button type="primary" onClick={() => handleClick('/consultaPaciente')}>Minhas Consultas</Button>
            <Button type="primary" onClick={() => handleClick('/meuProntuario')}>Meu Prontuario</Button>
        </Flex>
    </Space>
    <div style={{ width: '80%', transform: 'translate(13%,5%)', textAlign: "center"}}>
        {conteudo === '/cadastroConsulta' && <CadastroConsulta/>}
        {conteudo === '/consultaPaciente' && <ConsultasPaciente/>}
        {conteudo === '/meuProntuario' && <MeuProntuario/>}
        {conteudo === '/editPaciente' && <EditarPaciente/>}
    </div>
    </>
   );
}

export default Paciente;