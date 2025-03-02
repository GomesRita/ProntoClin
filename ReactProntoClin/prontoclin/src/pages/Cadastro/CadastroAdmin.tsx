import { Link } from "react-router-dom"
import { Button, Form, Input  } from 'antd';


function CadastroAdmin(){

    return (
        <div>
            <h2>Cadastro</h2>
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
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Senha" name="senha" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Button type="dashed">Cadastrar-se</Button>
            </Form>
            <Link to="/login">Já possui uma conta? Faça login</Link>
        </div>

    )

}

export default CadastroAdmin