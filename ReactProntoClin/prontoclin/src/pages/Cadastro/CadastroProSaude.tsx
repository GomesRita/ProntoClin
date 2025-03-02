import { Button, Form, Input  } from 'antd';


function CadastroProSaude(){

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