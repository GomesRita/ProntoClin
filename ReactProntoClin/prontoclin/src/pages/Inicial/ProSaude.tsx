import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../../controle/cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Descriptions, Flex, Space } from 'antd';
import AgendaProfissional from '../Listas/agendaProfissional';
import EditarProfissional from '../Edit/EditProfissional';
import ProntuarioPaciente from '../Listas/Prontuario';
import CadastrarProntuario from '../Cadastro/CadastroProntuario';

function ProSaude() {

   const [userData, setUserData] = useState<any>(null); 
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [conteudo, setConteudo] = useState(''); 
   const navigate = useNavigate();
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
              const response = await axios.get('http://localhost:8081/profSaude/me', {
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
                  <Button type="dashed" onClick={() => handleClick('/editProfissional')}>Editar Dados</Button>
                  <Button type="dashed" onClick={logout}>Sair</Button>
              </Space>
              <div style={{justifyItems: 'center'}}>
              <Descriptions title="Profissional de Saúde" style={{ justifyItems: 'center', width: '70%'}}>
                  <Descriptions.Item label="Nome" style={{textAlign: 'center'}}>{userData.nomeprofissionalsaude}</Descriptions.Item>
                  <Descriptions.Item label="Registro"  style={{textAlign: 'center'}}>{userData.registro}</Descriptions.Item>
                  <Descriptions.Item label="Especialidade Médica"  style={{textAlign: 'center'}}>{userData.especialidademedica}</Descriptions.Item>
                  <Descriptions.Item label="Telefone"  style={{textAlign: 'center'}}>{userData.telefoneprofissionalsaude}</Descriptions.Item>
                  <Descriptions.Item label="Email" style={{textAlign: 'center'}}>{userData.email}</Descriptions.Item>
                  <Descriptions.Item label="Status"  style={{textAlign: 'center'}}>{userData.status}</Descriptions.Item>
              </Descriptions>
              </div>
              <Flex gap="small" wrap style={{ justifyContent: 'center'}}>
                  <Button type="primary" onClick={() => handleClick('/AgendaProfissional')}>Minha Agenda</Button>
                  <Button type="primary" onClick={() => handleClick('/prontuarioPaciente')}>Prontuários</Button>
                  <Button type="primary" onClick={() => handleClick('/cadastroProntuario')}>Novo Prontuário</Button>
              </Flex>
          </Space>
          <div style={{ width: '80%', transform: 'translate(13%,5%)', textAlign: "center"}}>
            {/* Renderiza o conteúdo com base no estado */}
            {conteudo === '/AgendaProfissional' && <AgendaProfissional/>}
            {conteudo === '/editProfissional' && <EditarProfissional/>}
            {conteudo === '/prontuarioPaciente' && <ProntuarioPaciente/>}
            {conteudo === '/cadastroProntuario' && <CadastrarProntuario/>}
        </div>
          </>
   );
}

export default ProSaude;