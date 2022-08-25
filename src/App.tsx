import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/view/Dashboard';
import LoginChoice from './components/view/LoginChoice';
import LoginForm from './components/view/LoginForm';
import Agendamento from "./components/view/Agendamento";
import Horarios from "./components/view/Horarios";
import MonitoriasOverview from "./components/view/MonitoriasOverview";
import CadastrarMonitor from "./components/view/adm/CadastrarMonitor";
import GerenciarMonitores from "./components/view/adm/GerenciarMonitores";
import GerenciarSalas from "./components/view/adm/GerenciarSalas";
import GerenciarDepartamentos from "./components/view/adm/GerenciarDepartamentos";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/logintype" element={<LoginChoice/>}/>
                  <Route path="/login" element={<LoginForm/>}/>
                  <Route path="/agendamento" element={<Agendamento/>}/>
                  <Route path="/horarios" element={<Horarios/>}/>
                  <Route path="/monitorias" element={<MonitoriasOverview/>}/>
                  <Route path="/cadastro" element={<CadastrarMonitor/>}/>
                  <Route path="/monitores" element={<GerenciarMonitores/>}/>
                  <Route path="/salas" element={<GerenciarSalas/>}/>
                  <Route path="/departamentos" element={<GerenciarDepartamentos/>}/>

              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
