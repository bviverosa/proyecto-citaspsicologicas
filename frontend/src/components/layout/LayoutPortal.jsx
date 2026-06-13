import React from 'react';

const LayoutPortal = ({ children, irA }) => {
  return (
    <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header idéntico al primero, basado en tus estilos existentes */}
      <header style={{
        backgroundColor: 'var(--verde-oscuro)',
        color: 'var(--blanco)',
        padding: '10px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        zIndex: '10'
      }}>
        {/* Logo que manda al inicio al hacer clic */}
        <div className="logo" onClick={() => irA('inicio')} style={{ cursor: 'pointer', color: 'var(--blanco)', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🌿 SerenaMente
        </div>

        {/* Botón/Texto idéntico al del primer header, con función de regresar */}
        <button 
          className="btn-nav" 
          onClick={() => irA('inicio')}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            font: 'inherit',
            cursor: 'pointer',
            padding: '0',
            textDecoration: 'underline' // Para que parezca un link como en la primera imagen
          }}
        >
          Volver al Inicio
        </button>
      </header>

      {/* Contenido principal centrado */}
      <main style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'var(--beige-fondo)' // Fondo beige como en la segunda imagen
      }}>
        {children}
      </main>

      {/* Footer idéntico al primero */}
      <footer style={{
        backgroundColor: 'var(--verde-oscuro)',
        color: 'white',
        textAlign: 'center',
        padding: '15px',
        fontSize: '0.85rem',
        marginTop: 'auto'
      }}>
        <p>&copy; 2026 SerenaMente - Sistema de Gestión Especializada</p>
      </footer>
    </div>
  );
};

export default LayoutPortal;