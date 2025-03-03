import { Link } from 'react-router-dom';
import { useState} from 'react';
import { Button, Form, Input, message, DatePicker, Select, } from 'antd';
import { getToken } from '../controle/cookie';
import axios from 'axios';


function CadastroPaciente(){
    const [ ,setLoading] = useState(false); 
    const [ ,setError] = useState<string | null>(null); 

    const onFinish = async (values: { nome: string, nomeSocial: string, cpf: string, dataNascimento: string, telefone: string, sexo: string, email: string, senha: string }) => {
        setLoading(true); 
        setError(null);

        try {
            const token = getToken(); 
            if (token) {
                const response = await axios.post(
                    'http://localhost:8081/auth/register/paciente',
                    {
                        nomePaciente: values.nome,
                        nomeSocial: values.nomeSocial,
                        telefonePaciente: values.telefone,
                        cpfPaciente: values.cpf,
                        dataNascimento: "1990-05-15",
                        sexoPaciente: "F",
                        email: values.email,
                        senha: values.senha,
                        userrole: "PACIENTE"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                        }
                    }

                );
                console.log(response.data)
                message.success('Profissional de saude cadastrado com sucesso!'); 
                setError('Token não encontrado');
            }
        } catch (err) {
            setError('Erro ao cadastrar profissional de saude');
            message.error('Erro ao cadastrar profissional de saude'); 
        } finally {
            setLoading(false); 
        }
    };
    const { Option } = Select;
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
            <Option value="71">+71</Option>
            <Option value="73">+73</Option>
            <Option value="74">+74</Option>
            <Option value="75">+75</Option>
            <Option value="77">+77</Option>
            <Option value="79">+79</Option>
            <Option value="81">+81</Option>
            <Option value="82">+82</Option>
            <Option value="83">+83</Option>
            <Option value="84">+84</Option>
            <Option value="85">+85</Option>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
            <Option value="88">+88</Option>
            <Option value="89">+89</Option>
            <Option value="91">+91</Option>
            <Option value="92">+92</Option>
            <Option value="93">+93</Option>
            <Option value="94">+94</Option>
            <Option value="95">+95</Option>
            <Option value="98">+98</Option>
            <Option value="99">+99</Option>
          </Select>
        </Form.Item>
      );

    return (
        <div>
            <h2>Cadastro</h2>
            <Form
                name="layout-multiple-vertical"
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                >
                <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Nome Social" name="nomeSocial" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item
                    name="telefone"
                    label="Telefone"
                    rules={[{ required: true, message: 'Por favor, informe seu telefone' }]}
                >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="CPF" name="cpf" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item name="dataNascimento" label="Data nascimento">
                <DatePicker />
                </Form.Item>
                <Form.Item label="sexo" name="sexo" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Senha" name="senha" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Button type="dashed" htmlType="submit">Cadastrar-se</Button>
            </Form>
            <Link to="/login">Já possui uma conta? Faça login</Link>
        </div>

    )

}

export default CadastroPaciente;