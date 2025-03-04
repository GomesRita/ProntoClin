import  { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../controle/cookie';
import { Descriptions, Button, Flex,Space} from 'antd';
import CadastroAdmin from '../Cadastro/CadastroAdmin'; // Formulário de cadastro de administrador
import CadastroProSaude from '../Cadastro/CadastroProSaude';
import ListaProfissionais from '../Listas/ProfissionaisSaude';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../controle/cookie'; // Importe a função removeToken que você já criou
import EditarAdmin from '../Edit/EditAdm';


function AdmIncial(){
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
                const token = getToken(); // Recupera o token do cookie
                if (token) {
                const response = await axios.get('http://localhost:8081/adm/me', {
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
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Space direction='horizontal' size="middle" style={{display: 'flex'}}>
            <Button type="dashed" onClick={() => handleClick('/editAdmin')}>Editar Dados</Button>
            <Button type="dashed" onClick={logout}>Sair</Button>
            </Space>
            <Descriptions title="Administrador" className="description">
                <Descriptions.Item label="Nome">{userData.nome}</Descriptions.Item>
                <Descriptions.Item label="CPF">{userData.cpf}</Descriptions.Item>
                <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
            </Descriptions>
            <Flex gap="small" wrap>
                <Button type="primary" onClick={() => handleClick('/cadastroAdmin')}>Cadastrar Administrador</Button>
                <Button type="primary" onClick={() => handleClick('/cadastroProSaude')}>Cadastrar Profissional de Saude</Button>
                <Button type="primary" onClick={() => handleClick('/listarProfissionais')}>Exibir Profissionais</Button>
            </Flex>
            
        </Space>

        <div style={{ marginTop: '20px' }}>
            {/* Renderiza o conteúdo com base no estado */}
            {conteudo === '/cadastroAdmin' && <CadastroAdmin/>}
            {conteudo === '/cadastroProSaude' && <CadastroProSaude/>}
            {conteudo === '/listarProfissionais' && <ListaProfissionais/>}
            {conteudo === '/editAdmin' && <EditarAdmin/>}
        </div>

        </>
    );

}

export default AdmIncial;
