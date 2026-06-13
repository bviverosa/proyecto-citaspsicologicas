console.log("¡HOLA! El motor de React sí está arrancando");
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importas tu componente Application 
import Application from './Aplicacion.jsx';

// 1. CORRECCIÓN: Buscamos el id "root" que está en tu index.html
const rootElement = document.getElementById("root"); 

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Routes>
        {/* 2. CORRECCIÓN: Cambiamos a "/" para que cargue al entrar a localhost:8080 */}
        <Route path="/" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}