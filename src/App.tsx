import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/view/Dashboard';
import LoginChoice from './components/view/LoginChoice';
import LoginForm from './components/view/LoginForm';
import Agendamento from "./components/view/Agendamento";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/logintype" element={<LoginChoice/>}/>
                  <Route path="/login" element={<LoginForm/>}/>
                  <Route path={"/agendamento"} element={<Agendamento/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
