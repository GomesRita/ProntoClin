import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login/Login'
import CadastroAdmin from './pages/Cadastro/CadastroAdmin'

import './App.css'
import AdmIncial from './pages/Inicial/AdmInicial'
import Paciente from './pages/Inicial/PacienteInicial'
import CadastroProSaude from './pages/Cadastro/CadastroProSaude'
import CadastroPaciente from './pages/Cadastro/CadastroPaciente'
import CadastroConsulta from './pages/Cadastro/CadastrarConsulta'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastroAdmin" element={<CadastroAdmin/>}/>
        <Route path="/" element={<Login />}/>
        <Route path="/adm/me" element={<AdmIncial />}/>
        <Route path="/paciente" element={<Paciente />}/>
        <Route path="/cadastroProSaude" element={<CadastroProSaude />}/>
        <Route path="/cadastroPaciente" element={<CadastroPaciente />}/>
        <Route path="/cadastroConsulta" element={<CadastroConsulta />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
