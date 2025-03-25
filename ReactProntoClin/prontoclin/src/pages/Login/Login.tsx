import { Link } from "react-router-dom"
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from "../../controle/cookie";
function Login(){
    const navigate = useNavigate(); 

    const onFinish = async (values: { email: string; senha: string }) => {
        try {

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
          setToken(response.data.token);
          const role = response.data.userrole;
          if (role === "ADMIN") {
            navigate('/adm/me');  
          } else if (role == 'PACIENTE') {
            navigate('/paciente'); 
          } else {
            navigate('/profSaude/me');
          }
        } catch (error) {
          message.error('Erro no login');
        }
      };
      

    return (
        <div>
            <h2 style={{ color: '#262626' }}>Login</h2>
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
            <Link to="/cadastroPaciente">Não possui uma conta? Cadastre-se</Link>
        </div>
    )

}

export default Login