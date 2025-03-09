import { Button, DatePicker, Form, Input, message, Select } from "antd";
import axios from "axios";
import { getToken } from "../../controle/cookie";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

function CadastrarProntuario() {
  dayjs.extend(utc);

  const onFinish = async (values: { cpfpaciente: string, dataconsulta: Date, historicomedico: string, alergias: string, queixaprinciapal: string, diagnostico: string, situacaotramento: string, prescricaotramento: string }) => {


    try {
      const token = getToken();
        console.log('token: ' + token)
      if (token) {
        // Formatar dataconsulta para o formato correto
        const formattedDataConsulta = dayjs(values.dataconsulta).format("YYYY-MM-DDTHH:mm:ss");
        // Enviar a requisição com os dados formatados
        const response = await axios.post(
          'http://localhost:8081/prontuario/adicionarProntuario',
          {
            cpfpaciente: values.cpfpaciente,
            consulta: {
              dataconsulta: formattedDataConsulta, // Data formatada
            },
            historicomedico: values.historicomedico,
            alergias: values.alergias,
            ultimaatualizacao: dayjs().toISOString(), // Data de atualização fixada para o momento atual
            queixaprinciapal: values.queixaprinciapal,
            diagnostico: values.diagnostico,
            situacaotramento: values.situacaotramento,
            prescricaomedica: values.prescricaotramento, // Corrigido para o nome correto
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log("Resposta da API:", response);
        message.success('Prontuário atualizado com sucesso!');
      }
    } catch (error) {
      console.error("Erro ao atualizar prontuário:", error);
      message.error('Erro ao atualizar prontuário!');
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          situacaotramento: 'Em andamento',
          dataconsulta: null,
          ultimaatualizacao: null,
        }}
      >
        <Form.Item label="CPF" name="cpfpaciente" rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Data da Consulta" name="dataconsulta" rules={[{ required: true, message: 'Por favor, selecione a data da consulta!' }]}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="Histórico Médico" name="historicomedico" rules={[{ required: true, message: 'Por favor, insira o histórico médico!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Alergias" name="alergias" rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Queixa Principal" name="queixaprinciapal" rules={[{ required: true, message: 'Por favor, insira a queixa principal!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Diagnóstico" name="diagnostico" rules={[{ required: true, message: 'Por favor, insira o diagnóstico!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Situação do Tratamento" name="situacaotramento" rules={[{ required: true, message: 'Por favor, selecione a situação do tratamento!' }]}>
          <Select>
            <Select.Option value="Em andamento">Em andamento</Select.Option>
            <Select.Option value="Finalizado">Finalizado</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Prescrição Médica" name="prescricaotramento" rules={[{ required: true, message: 'Por favor, insira a prescrição médica!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar Alterações
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CadastrarProntuario;
