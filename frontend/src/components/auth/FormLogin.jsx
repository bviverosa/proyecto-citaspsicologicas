// src/components/auth/FormLogin.jsx
import React from 'react';
import { INPUTS_LOGIN } from '../../data/introData';

export default function FormLogin({ formData, onChange, onSubmit, error, alCambiarVista }) {
  return (
    <div className="formulario-contenedor">
      <h2>Portal de Psicólogos</h2>
      <p className="subtitulo">Ingresa a tu consultorio virtual</p>
      
      <form onSubmit={onSubmit}>
        {INPUTS_LOGIN.map((input) => (
          <div className="input-group" key={input.id}>
            <input
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              value={formData[input.id] || ''}
              onChange={(e) => onChange(input.id, e.target.value)}
              required
            />
          </div>
        ))}
        
        {error && <div className="error-message">⚠️ {error}</div>}
        
        <button type="submit" className="auth-btn">Ingresar al Sistema</button>
      </form>
      
      <p className="auth-footer">
        ¿Eres un nuevo especialista?{' '}
        <span onClick={() => alCambiarVista('registro')} className="auth-link">
          Regístrate aquí
        </span>
      </p>
    </div>
  );
}