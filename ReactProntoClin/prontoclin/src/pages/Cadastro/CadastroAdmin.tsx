import { useState} from 'react';
import { Button, Form, Input, message   } from 'antd';
import { getToken } from '../../controle/cookie';
import axios from 'axios';

function CadastroAdmin(){
    const [ loading ,setLoading] = useState(false);
    const [ error ,setError] = useState<string | null>(null); 

    const onFinish = async (values: { nome: string, cpf: string, email: string, senha: string }) => {
        setLoading(true); 
        setError(null);

        try {
            const token = getToken(); 
            if (token) {
                await axios.post(
                    'http://localhost:8081/auth/register/adm',
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
                            'Authorization': `Bearer ${token}`,
                        }
                    }

                );
                message.success('Administrador cadastrado com sucesso!'); 
                setError('Token não encontrado');
            }
        } catch (err) {
            setError('Erro ao cadastrar administrador');
            message.error('Erro ao cadastrar administrador'); 
        } finally {
            setLoading(false); 
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }
    
    
    if (error) {
        return <div>Erro ao carregar os dados: {error}</div>;
    }


    return (
        <div style={{display:'flex' ,justifyContent: 'center', alignItems: 'center'}}>
            <Form
                name="layout-multiple-vertical"
                layout="vertical"
                labelCol={{ span: 100 }}
                wrapperCol={{ span: 100 }}
                onFinish={onFinish}
                style={{width: '50%'}}
                >
                <h2 style={{ color: '#262626' }}>Cadastro de Administradores</h2>
                <Form.Item 
                    label="Nome" 
                    name="nome"
                    rules={[{ required: true, message: 'Por favor, insira um nome!' }]}>
                <Input />
                </Form.Item>
                <Form.Item label="CPF" name="cpf" rules={[
                    { required: true },
                    {
                        pattern: /^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/,
                        message: 'O CPF deve conter 11 dígitos. Ex.: XXX.XXX.XXX-XX',
                    },
                    ]}>
                <Input />
                </Form.Item>
                <Form.Item 
                    label="Email"
                    name="email"
                    rules={[
                        {   type: 'email',
                            message: 'Tipo de email inválido'
                        },
                        { required: true, message: 'Por favor, insira um email!' }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Senha" name="senha" rules={[
                    { required: true },
                    {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/,
                    message:  
                    <div style={{textAlign: 'left'}}>
                    <p><strong>A senha deve atender aos seguintes requisitos:</strong></p>
                    <ol>
                        <li>Pelo menos 6 caracteres.</li>
                        <li>Deve conter pelo menos uma letra minúscula.</li>
                        <li>Deve conter pelo menos uma letra maiúscula.</li>
                        <li>Deve conter pelo menos um número.</li>
                        <li>Deve conter pelo menos um caractere especial: $, *, &, @, ou #.</li>
                    </ol>
                    </div>,
                    }
                    ]}>
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
                <Button type="dashed" htmlType="submit">Cadastrar</Button>
            </Form>
        </div>

    )

}

export default CadastroAdmin