import { useEffect, useState} from 'react';
import { Form, message, Select, Button} from 'antd';
import { getToken } from '../controle/cookie';
import axios from 'axios';



function CadastroConsulta(){
    const [profissionais, setProfissionais] = useState<any[]>([]);
    const [ loading, setLoading] = useState(false); 
    const [ error,setError] = useState<string | null>(null); 


    const onFinish = async (values: { nome: string, data: Date }) => {
        setLoading(true); 
        setError(null);
        console.log('Nome: ' + values.nome, ' data: ' + values.data)
        if (loading) {
            return <div>Carregando...</div>;
        }
        
        
        if (error) {
            return <div>Erro ao carregar os dados: {error}</div>;
        }
    
        try {
            const token = getToken(); 
            if (token) {
                const response = await axios.post(
                    'http://localhost:8081/consulta/agendaprofissional',
                    {
                        nomeProfissionalSaude: values.nome,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                        }
                    }

                );
                console.log(response.data)
                message.success('Consulta cadastrada com sucesso!'); 
                setError('Token não encontrado');
            }
        } catch (err) {
            setError('Erro ao cadastrar consulta');
            message.error('Erro ao cadastrar consulta'); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();
            if (token) {
              try {
                const response = await axios.get(
                  'http://localhost:8081/profSaude/profissionais',
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                  }
                );
                setProfissionais(response.data);
              } catch (error) {
                console.error('Erro ao buscar profissionais:', error);
                message.error('Erro ao buscar profissionais');
              }
            } else {
              message.error('Token não encontrado');
            }
        }
            fetchData()

      }, []);

    return (
        <div>
            <h2 style={{ color: '#262626' }}>Cadastro de Profissionais de Saúde</h2>
            <Form
                name="layout-multiple-vertical"
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                >
                <Form.Item
                    label="Profissional Saude"
                    name="nome"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Select
                    placeholder="Selecione um profissional"
                    loading={loading} // Mostra o ícone de carregamento enquanto os dados não foram carregados
                    >
                        {profissionais.map((profissional) => (
                            <Select.Option key={profissional.nomeprofissionalsaude} value={profissional.nomeprofissionalsaude}>
                                {profissional.nomeprofissionalsaude}, {profissional.especialidademedica}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Button type="dashed" htmlType="submit">Acessar Agenda</Button>
                </Form>
        </div>

    )

}

export default CadastroConsulta;