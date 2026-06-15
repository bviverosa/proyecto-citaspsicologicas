// src/components/layout/Layout.jsx
import React from 'react';

export default function Layout({ seccion, irA, children }) {
  // Función auxiliar para navegar sin recargar la página
  const manejarNavegacion = (e, destino) => {
    e.preventDefault(); // Detiene cualquier comportamiento de recarga del navegador
    irA(destino);
  };

  return (
    <div>
      <header>
        <div 
          className="logo" 
          onClick={(e) => manejarNavegacion(e, 'inicio')} 
          style={{ cursor: 'pointer', color: 'white' }}
        >
          🌿 SerenaMente
        </div>
        <div 
          className="user-profile" 
          onClick={(e) => manejarNavegacion(e, 'consultorio')} 
          style={{ cursor: 'pointer' }}
          title="Ir al acceso de Psicólogos"
        >
          <span style={{ fontSize: '0.85rem', color: 'white', textDecoration: 'underline' }}>
            Consultorio Virtual
          </span>
          <div className="avatar" style={{ background: 'var(--verde-claro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            🌿
          </div>
        </div>
      </header>

      <div className="layout">
        <aside>
          <h3>Menú principal</h3>
          <nav>
            {/* Cambiamos a botones con comportamiento controlado o enlaces con preventDefault */}
            <button 
              className={`nav-link ${seccion === 'inicio' ? 'active' : ''}`} 
              onClick={(e) => manejarNavegacion(e, 'inicio')}
            >
              🏠 Inicio
            </button>
            <button 
              className={`nav-link ${seccion === 'test' ? 'active' : ''}`} 
              onClick={(e) => manejarNavegacion(e, 'test')}
            >
              📋 Test de Beck
            </button>
            <button 
              className={`nav-link ${seccion === 'psico' ? 'active' : ''}`} 
              onClick={(e) => manejarNavegacion(e, 'psico')}
            >
              🧠 Psicoeducación
            </button>
            <button 
              className={`nav-link ${seccion === 'relax' ? 'active' : ''}`} 
              onClick={(e) => manejarNavegacion(e, 'relax')}
            >
              🫁 Relajación
            </button>
            <button 
              className={`nav-link ${seccion === 'recursos' ? 'active' : ''}`} 
              onClick={(e) => manejarNavegacion(e, 'recursos')}
            >
              📚 Recursos
            </button>
          </nav>
        </aside>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}