import { useState} from 'react';
import { Button, Form, Input, message, Select   } from 'antd';
import { getToken } from '../../controle/cookie';
import axios from 'axios';


function CadastroProSaude(){
    const [ loading, setLoading] = useState(false); 
    const [ error,setError] = useState<string | null>(null); 

    const onFinish = async (values: { nome: string, cpf: string, especialidadeMedica: string, prefix: string,telefone: string, tipoRegistro: string, numeroRegistro: string, estadoRegistro: string, email: string, senha: string }) => {
        setLoading(true); 
        setError(null);
        
        if (loading) {
            return <div>Carregando...</div>;
        }
        
        
        if (error) {
            return <div>Erro ao carregar os dados: {error}</div>;
        }
    
        try {
            const token = getToken();
            const telefoneCompleto = `(${values.prefix}) ${values.telefone}`;
            const registroProSaude = values.tipoRegistro+'-'+values.numeroRegistro+'-'+values.estadoRegistro
            if (token) {
                await axios.post(
                    'http://localhost:8081/auth/register/prosaude',
                    {
                        nomeProfissionalSaude: values.nome,
                        cpfProfissionalSaude: values.cpf,
                        especialidadeMedica: values.especialidadeMedica,
                        telefoneProfissionalSaude: telefoneCompleto,
                        registro: registroProSaude,
                        status: "ATIVO",
                        email: values.email,
                        senha: values.senha,
                        userrole: "PROFSAUDE"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                        }
                    }

                );

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
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Form
                name="layout-multiple-vertical"
                layout="vertical"
                labelCol={{ span: 100 }}
                wrapperCol={{ span: 100 }}
                onFinish={onFinish}
                style={{width: '50%'}}
                >
                <h2 style={{ color: '#262626' }}>Cadastro de Profissionais de Saúde</h2>
                <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Especiauldade médica" name="especialidadeMedica" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item
                    name="telefone"
                    label="Telefone"
                    rules={[
                    { required: true, message: 'Por favor, informe seu telefone' },
                    {
                        pattern:/^(\d{5})(\d{4})$/, 
                        message: 'O telefone deve estar no formato 9XXXXXXXX',
                    },
                    ({ getFieldValue }) => ({
                        validator(_,_value) {
                        const prefixoSelecionado = getFieldValue('prefix');
                        if (!prefixoSelecionado) {
                            return Promise.reject(new Error('Por favor, selecione um prefixo'));
                        }
                        return Promise.resolve();
                        },
                    }),
                    ]}
                >
                    <Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                    placeholder="Insira seu telefone (ex: (XX) XXXXXXXXX)"
                    maxLength={15}
                    />
                </Form.Item>
                <Form.Item label="Tipo de Resgistro" name="tipoRegistro" rules={[{ required: true }]}>
                <Select style={{ width: '100%' }} placeholder="Selecione o tipo">
                    <Option value="CRM">CRM - Médicos</Option>
                    <Option value="CRO">CRO - Dentistas</Option>
                    <Option value="COREN">COREN - Enfermagem</Option>
                    <Option value="CRF">CRF - Farmacêuticos</Option>
                    <Option value="CREFITO">CREFITO - Fisioterapeutas e Terapeutas Ocupacionais</Option>
                    <Option value="CRP">CRP - Psicólogos</Option>
                    <Option value="CRN">CRN - Nutricionistas</Option>
                </Select>
                </Form.Item>
                <Form.Item label="Número do Registo" name="numeroRegistro" rules={[
                    {
                        pattern: /^(\d{2}\/\d{4})|(\d{1,2}\.\d{3})$/,
                        message: 'O registro deve seguir o padrão XX.XXX ou XX/XXXX para registros CRP',
                    },
                    { required: true }
                ]}>
                <Input/>
                </Form.Item>
                <Form.Item label="Estado" name="estadoRegistro" rules={[{ required: true }]}>
                <Select style={{ width: '100%' }} placeholder="Selecione o estado">
                    <Option value="AC">Acre</Option>
                    <Option value="AL">Alagoas</Option>
                    <Option value="AP">Amapá</Option>
                    <Option value="AM">Amazonas</Option>
                    <Option value="BA">Bahia</Option>
                    <Option value="CE">Ceará</Option>
                    <Option value="DF">Distrito Federal</Option>
                    <Option value="ES">Espírito Santo</Option>
                    <Option value="GO">Goiás</Option>
                    <Option value="MA">Maranhão</Option>
                    <Option value="MT">Mato Grosso</Option>
                    <Option value="MS">Mato Grosso do Sul</Option>
                    <Option value="MG">Minas Gerais</Option>
                    <Option value="PA">Pará</Option>
                    <Option value="PB">Paraíba</Option>
                    <Option value="PR">Paraná</Option>
                    <Option value="PE">Pernambuco</Option>
                    <Option value="PI">Piauí</Option>
                    <Option value="RJ">Rio de Janeiro</Option>
                    <Option value="RN">Rio Grande do Norte</Option>
                    <Option value="RS">Rio Grande do Sul</Option>
                    <Option value="RO">Rondônia</Option>
                    <Option value="RR">Roraima</Option>
                    <Option value="SC">Santa Catarina</Option>
                    <Option value="SP">São Paulo</Option>
                    <Option value="SE">Sergipe</Option>
                    <Option value="TO">Tocantins</Option>
                </Select>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[
                    { type: 'email',
                    message: 'Tipo de email inváuldo'
                    },
                    { required: true }
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
                <Button type="dashed" htmlType="submit">Cadastrar</Button>
            </Form>
        </div>

    )

}

export default CadastroProSaude