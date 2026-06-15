// src/App.jsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'; // 👈 Importamos la herramienta de montaje
import Layout from './components/layout/Layout.jsx';
import SeccionInicio from './components/sections/SeccionInicio.jsx';
import SeccionTest from './components/sections/SeccionTest.jsx';
import SeccionPsico from './components/sections/SeccionPsico.jsx';
import SeccionRelax from './components/sections/SeccionRelax.jsx';
import SeccionRecursos from './components/sections/SeccionRecursos.jsx';
import Intro from './components/auth/Intro.jsx'; 
import './assets/estilos.css';

function App() {
  const [seccion, setSeccion] = useState('inicio');

  const irA = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);
  };

  const renderContent = () => {
    switch (seccion) {
      case 'inicio':
        return (
          <div>
            <h2>Bienvenido/a a SerenaMente</h2>
            <SeccionInicio irA={irA} />
          </div>
        );
      case 'test':
        return (
          <div>
            <h2>Inventario de Ansiedad de Beck (BAI)</h2>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Indica qué tan molesto/a te ha sentido por cada síntoma durante la <strong>última semana</strong>.
            </p>
            <SeccionTest />
          </div>
        );
      case 'psico':
        return (
          <div>
            <h2>Psicoeducación sobre Ansiedad</h2>
            <SeccionPsico />
          </div>
        );
      case 'relax':
        return (
          <div>
            <h2>Ejercicios de Relajación</h2>
            <SeccionRelax />
          </div>
        );
      case 'recursos':
        return (
          <div>
            <h2>Recursos y Apoyo Profesional</h2>
            <SeccionRecursos />
          </div>
        );
      default:
        return <h2>Sección no encontrada</h2>;
    }
  };

  if (seccion === 'consultorio') {
    return <Intro irA={irA} />;
  }

  return (
    <Layout seccion={seccion} irA={irA}>
      {renderContent()}
    </Layout>
  );
}

// 👈 El propio App.jsx se encarga de renderizarse a sí mismo en el HTML
const contenedor = document.getElementById('root');
if (contenedor) {
  const root = createRoot(contenedor);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;