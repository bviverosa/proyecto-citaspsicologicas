// src/components/auth/FormRegistro.jsx
import React from 'react';
import { INPUTS_REGISTRO } from '../../data/introData';

export default function FormRegistro({ formData, onChange, onSubmit, error, mensaje, alCambiarVista }) {
  return (
    <div className="formulario-contenedor">
      <h2>Registro de Especialistas</h2>
      <p className="subtitulo">Únete a la red de salud mental de SerenaMente</p>
      
      <form onSubmit={onSubmit}>
        {INPUTS_REGISTRO.map((input) => (
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
        {mensaje && <div className="success-message">✅ {mensaje}</div>}
        
        <button type="submit" className="auth-btn">Registrarse</button>
      </form>
      
      <p className="auth-footer">
        ¿Ya tienes una cuenta?{' '}
        <span onClick={() => alCambiarVista('login')} className="auth-link">
          Inicia sesión aquí
        </span>
      </p>
    </div>
  );
}