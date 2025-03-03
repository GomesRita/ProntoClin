import { useState} from 'react';
import { Form, message , DatePicker, Select, Button} from 'antd';
import { getToken } from '../controle/cookie';
import dayjs from 'dayjs';
import axios from 'axios';

function CadastroConsulta(){

    const [ loading, setLoading] = useState(false); 
    const [ error,setError] = useState<string | null>(null); 
    const currentDateTime = dayjs();

    const onFinish = async (values: { nome: string, data: Date }) => {
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
            if (token) {
                const response = await axios.post(
                    'http://localhost:8081/consulta',
                    {
                        nomeProfissionalSaude: values.nome,
                        dataConsulta: values.nome
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
            <Select />
            </Form.Item>
            </Form>
            <Form.Item name="data" label="Data Consulta">
            <DatePicker showTime format="YYYY-MM-DD HH:mm"           
            disabledDate={(current) => current && current.isBefore(currentDateTime, 'day')}
            disabledTime={() => ({
                disabledHours: () => {
                    const allowedHours = [
                      ...Array.from({ length: 5 }, (_, i) => i + 8),
                      ...Array.from({ length: 5 }, (_, i) => i + 14)
                    ];
                    return Array.from({ length: 24 }, (_, i) => i).filter(hour => !allowedHours.includes(hour));
                  },
                disabledMinutes: () => {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]; // Desabilitar todos os minutos, exceto 00 e 30
                },
                disabledSeconds: (selectedHour, selectedMinute) => {
                if (selectedHour === currentDateTime.hour() && selectedMinute === currentDateTime.minute()) {
                    const currentSecond = currentDateTime.second();
                    return Array.from({ length: currentSecond }, (_, i) => i);
                }
                return [];
                },
            })}
         />
            </Form.Item>
            <Button type="dashed" htmlType="submit">Cadastrar-se</Button>
        </div>

    )

}

export default CadastroConsulta;