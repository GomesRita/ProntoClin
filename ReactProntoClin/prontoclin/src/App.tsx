import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login/Login'
import CadastroAdmin from './pages/Cadastro/CadastroAdmin'
import './App.css'
import AdmIncial from './pages/Inicial/AdmInicial'
import PacienteInicial from './pages/Inicial/PacienteInicial'
import CadastroProSaude from './pages/Cadastro/CadastroProSaude'
import CadastroPaciente from './pages/Cadastro/CadastroPaciente'
import CadastroConsulta from './pages/Cadastro/CadastrarConsulta'
import ListaProfissionais from './pages/Listas/ProfissionaisSaude'
import EditarAdmin from './pages/Edit/EditAdm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastroAdmin" element={<CadastroAdmin/>}/>
        <Route path="/" element={<Login />}/>
        <Route path="/adm/me" element={<AdmIncial />}/>
        <Route path="/paciente" element={<PacienteInicial/>}/>
        <Route path="/cadastroProSaude" element={<CadastroProSaude />}/>
        <Route path="/cadastroPaciente" element={<CadastroPaciente />}/>
        <Route path="/cadastroConsulta" element={<CadastroConsulta />}/>
        <Route path="/listarProfissionais" element={<ListaProfissionais/>}/>
        <Route path="/editAdmin" element={<EditarAdmin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
