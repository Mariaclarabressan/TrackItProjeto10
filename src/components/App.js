import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";
import { useState } from "react";
import UsuarioContext from "../context/UsuarioContext";
import {ProgressProvider} from '../context/ProgressoContext';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

    const [token, setToken] = useState("");
    const [imagem, setImagem] = useState("");

    return (
        <BrowserRouter>
            <ProgressProvider>
            <UsuarioContext.Provider value={{ token, setToken, imagem, setImagem }}>
                <Routes>
                    <Route path="/" element={<TelaLogin />} />
                    <Route path="/cadastro" element={<TelaCadastro />} />
                    <Route path="/habito" element={<TelaHabitos />} />
                    <Route path="/hoje" element={<TelaHoje />} />
                    <Route path="/historico" element={<TelaHistorico />} />
                </Routes>
            </UsuarioContext.Provider>
            </ProgressProvider>
        </BrowserRouter>
    )
}