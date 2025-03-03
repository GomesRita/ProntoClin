import { useState} from 'react';
import { Button, Form, Input, message   } from 'antd';
import { getToken } from '../controle/cookie';
import axios from 'axios';

function CadastroProSaude(){
    const [ ,setLoading] = useState(false); // Gerenciar o carregamento durante a requisição
    const [ ,setError] = useState<string | null>(null); // Gerenciar erro de requisição

    // Função chamada ao enviar o formulário
    const onFinish = async (values: { nome: string, cpf: string, email: string, senha: string }) => {
        setLoading(true); // Inicia o carregamento
        setError(null); // Limpa o erro

        try {
            const token = getToken(); // Recupera o token do cookie
            if (token) {
                const response = await axios.post(
                    'http://localhost:8081/auth/register/prosaude', // Endereço da API para cadastrar administrador
                    {
                        nome: values.nome,
                        cpf: values.cpf,
                        email: values.email,
                        senha: values.senha,
                        userrole: "ADMIN"
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
                message.success('Administrador cadastrado com sucesso!'); // Exibe mensagem de sucesso
            } else {
                setError('Token não encontrado');
            }
        } catch (err) {
            setError('Erro ao cadastrar administrador');
            message.error('Erro ao cadastrar administrador'); // Exibe mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <div>
            <h2 style={{ color: '#262626' }}>Cadastro de Profissionais de Saúde</h2>
            <Form
                name="layout-multiple-vertical"
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                >
                <Form.Item label="Nome" name="Nome" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="CPF" name="CPF" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Especialidade médica" name="especialidadeMedica" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Telefone" name="telefone" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="CRM" name="CRM" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Senha" name="senha" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Button type="dashed">Cadastrar</Button>
            </Form>
        </div>

    )

}

export default CadastroProSaude