import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/view/Dashboard';
import LoginChoice from './components/view/LoginChoice';
import LoginForm from './components/view/LoginForm';
import Agendamento from "./components/view/Agendamento";
import Horarios from "./components/view/Horarios";
import MonitoriasOverview from "./components/view/MonitoriasOverview";
import CadastrarMonitor from "./components/view/CadastrarMonitor";

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
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
