import React from 'react';
import '../assets/styles.css';

function Header({ irA }) {
  return (
    <header>
      <div
        className="logo"
        onClick={() => irA('inicio')}
        style={ { cursor: 'pointer', color: 'white' }}
      >
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
        <div
          className="avatar"
          style={{
            background: 'var(--verde-claro)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}
        >
          🌿
        </div>
      </div>
    </header>
  );
}

export default Header;
