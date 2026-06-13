// src/components/layout/Layout.jsx
import React from 'react';

export default function Layout({ seccion, irA, children }) {
  return (
    <div>
      <header>
        <div className="logo" onClick={() => irA('inicio')} style={{ cursor: 'pointer', color: 'white' }}>
          🌿 SerenaMente
        </div>
        <div 
          className="user-profile" 
          onClick={() => irA('consultorio')} 
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
          <h3 style={{ color: 'var(--blanco)' }}>Menú principal</h3>
          <nav>
            <a className={seccion === 'inicio' ? 'active' : ''} onClick={() => irA('inicio')}>🏠 Inicio</a>
            <a className={seccion === 'test' ? 'active' : ''} onClick={() => irA('test')}>📋 Test de Beck</a>
            <a className={seccion === 'psico' ? 'active' : ''} onClick={() => irA('psico')}>🧠 Psicoeducación</a>
            <a className={seccion === 'relax' ? 'active' : ''} onClick={() => irA('relax')}>🫁 Relajación</a>
            <a className={seccion === 'recursos' ? 'active' : ''} onClick={() => irA('recursos')}>📚 Recursos</a>
          </nav>
        </aside>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}