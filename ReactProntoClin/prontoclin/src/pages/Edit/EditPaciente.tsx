import { useEffect, useState } from "react";
import { getToken } from "../../controle/cookie";
import axios from "axios";
import { Button, Form, Input, message} from 'antd';

function EditarPaciente(){
    const [userData, setUserData] = useState<any>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formChanged, setFormChanged] = useState(false);
    const [form] = Form.useForm();

    // Detecta alterações no formulário e ativa/desativa o botão de submit
    const onFieldsChange = () => {
        setFormChanged(true); // Quando o usuário alterar algum campo, habilita o botão de submit
    };
    

    const onFinish = async (values: { nome: string, nomesocial: string, telefone: string, email: string, senha: string}) => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken(); // Recupera o token do cookie
            if (token) {
                const response = await axios.put(
                    'http://localhost:8081/paciente/atualiza', // Endereço da API para cadastrar administrador
                    {
                        nomepaciente: values.nome,
                        nomesocial: values.nomesocial,
                        telefonepaciente: values.telefone,
                        email: values.email,
                        senha: values.senha,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Adicionando token no cabeçalho
                        }
                    }

                );
                console.log(response.data)
                // Se a requisição for bem-sucedida
                message.success('Dados atualizados'); // Exibe mensagem de sucesso
            } else {
                setError('Login não encontrado');
            }
        } catch (err) {
            setError('Erro ao atualizar dados');
            message.error('Erro ao atualizar dados'); // Exibe mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    useEffect(() => {
    
        const fetchData = async () => {
            try {
                const token = getToken(); // Recupera o token do cookie
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

    return(

     <div style={{display:'flex' ,justifyContent: 'center', alignItems: 'center'}}>
        <Form
            form={form}
            name="dependencies"
            layout="vertical"
            labelCol={{ span: 100 }}
            wrapperCol={{ span: 100 }}
            initialValues={{
                nome: userData.nomepaciente,
                nomesocial: userData.nomesocial,
                telefone: userData.telefonepaciente,
                email: userData.email,
                senha: '',
            }}
            style={{width: '50%'}}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            >
              <h2 style={{ color: '#262626' }}>Editar Dados Pessoais</h2>
            <Form.Item 
                label="Nome" 
                name="nome"
                rules={[{ required: true, message: 'Por favor, insira um nome!' }]}>
            <Input />
            </Form.Item>
            <Form.Item 
                label="Nome Social" 
                name="nomesocial"
                rules={[{ required: true, message: 'Por favor, insira um nome!' }]}>
            <Input />
            </Form.Item>
            <Form.Item 
                label="Telefone" 
                name="telefone"
                rules={[{ required: true, message: 'Por favor, insira um nome!' }]}>
            <Input />
            </Form.Item>
            <Form.Item 
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Por favor, insira um email!' }]}>
            <Input />
            </Form.Item>
            <Form.Item 
                label="Senha" 
                name="senha"
                rules={[{ required: true, message: 'Por favor, insira uma senha!' }]}>
            <Input />
            </Form.Item>
            <Form.Item
                label="Confirmar senha"
                name="password2"
                dependencies={['senha']}
                rules={[
                {
                    required: true,
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('senha') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Senhas incompatíveis '));
                    },
                }),
                ]}
            >
                <Input />
            </Form.Item>
            
            <Button type="dashed" htmlType="submit" disabled={!formChanged} >Salvar</Button>
        </Form>
    </div>

    );
}

export default EditarPaciente;