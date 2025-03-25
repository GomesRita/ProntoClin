import { useEffect, useState } from "react";
import { getToken } from "../../controle/cookie";
import axios from "axios";
import { Button, Form, Input, message} from 'antd';

function EditarProfissional(){
    const [userData, setUserData] = useState<any>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formChanged, setFormChanged] = useState(false);
    const [form] = Form.useForm();

   
    const onFieldsChange = () => {
        setFormChanged(true); 
    };
    

    const onFinish = async (values: { prefix: string,telefone: string, email: string, senha: string}) => {
        setLoading(true);
        setError(null);
        if(values.senha == null){
            values.senha = userData.senha
        }
        try {
            const token = getToken(); 
            if (token) {
                await axios.put(
                    'http://localhost:8081/profSaude/atualiza', 
                    {
                        telefoneprofissionalsaude: values.telefone,
                        email: values.email,
                        senha: values.senha,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                        }
                    }

                );
                message.success('Dados atualizados com sucesso!'); 
            } else {
                setError('Login não encontrado');
            }
        } catch (err) {
            setError('Erro ao atualizar dados');
            message.error('Erro ao atualizar dados'); 
        } finally {
            setLoading(false); 
        }
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

    return(

     <div style={{display:'flex' ,justifyContent: 'center', alignItems: 'center'}}>
        <Form
            form={form}
            name="dependencies"
            layout="vertical"
            labelCol={{ span: 100 }}
            wrapperCol={{ span: 100 }}
            initialValues={{
                telefone: userData.telefoneprofissionalsaude,
                email: userData.email,
                senha: '', 
            }}
            style={{width: '50%'}}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            >
              <h2 style={{ color: '#262626' }}>Editar Dados Pessoais</h2>
              <Form.Item
                name="telefone"
                label="Telefone"
                rules={[
                { required: true, message: 'Por favor, informe seu telefone' },
                {
                    pattern:/^\(\d{2}\) \d{5}\d{4}$/, 
                    message: 'O telefone deve estar no formato 9XXXXXXXX',
                },
                ]}
                >
                <Input
                style={{ width: '100%' }}
                placeholder="Insira seu telefone (ex: 11 987654321)"
                maxLength={15}
                />
            </Form.Item>
            <Form.Item 
                label="Email"
                name="email"
                rules={[
                    { 
                        type: 'email',
                        message: 'Tipo de email inválido'
                    },
                    { required: true, message: 'Por favor, insira um email!' }
                    ]}>
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
            
            <Button type="dashed" htmlType="submit" disabled={!formChanged} >Salvar</Button>
        </Form>
    </div>

    );
}

export default EditarProfissional;