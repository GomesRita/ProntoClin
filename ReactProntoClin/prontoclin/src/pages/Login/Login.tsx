import { Link } from "react-router-dom"
import { Button, Form, Input } from 'antd';
import axios from 'axios';

function Login(){

    const onFinish = async (values: { email: string; senha: string }) => {
        try {
          // Envia os dados para o backend
          const response = await axios.post(
            'http://localhost:8081/auth/login',
            {
              email: values.email,
              senha: values.senha
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true 
            }
          );
      
          // Se a requisição for bem-sucedida
          console.log('Login bem-sucedido', response);
        } catch (error) {
          // Se ocorrer um erro na requisição
          console.error('Erro no login', error);
        }
      };
      

    return (
        <div>
            <h2>Login</h2>
            <Form
                name="layout-multiple-vertical"
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Senha"
                    name="senha"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="dashed" htmlType="submit">
                    Entrar
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/cadastro">Não possui uma conta? Cadastre-se</Link>
        </div>
    )

}

export default Login