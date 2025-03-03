import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login/Login'
import CadastroAdmin from './pages/Cadastro/CadastroAdmin'

import './App.css'
import AdmIncial from './pages/Inicial/AdmInicial'
import Paciente from './pages/Inicial/PacienteInicial'
import CadastroProSaude from './pages/Cadastro/CadastroProSaude'
import CadastroPaciente from './pages/Cadastro/CadastroPaciente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastroAdmin" element={<CadastroAdmin/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/adm/me" element={<AdmIncial />}/>
        <Route path="/paciente" element={<Paciente />}/>
        <Route path="/cadastroProSaude" element={<CadastroProSaude />}/>
        <Route path="/cadastroPaciente" element={<CadastroPaciente />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
