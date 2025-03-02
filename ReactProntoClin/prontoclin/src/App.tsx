import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login/Login'
import CadastroAdmin from './pages/Cadastro/CadastroAdmin'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<CadastroAdmin/>}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
