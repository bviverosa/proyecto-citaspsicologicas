import React, { useState } from 'react';
import FormLogin from './components/auth/FormLogin.jsx';
import FormRegistro from './components/auth/FormRegistro.jsx';
import DashboardPsicologo from './components/dashboard/DashboardPsicologo.jsx';
import LayoutPortal from './components/layout/LayoutPortal.jsx';
import './assets/estilos.css';

export default function Intro({ irA }) {
  // 1. Estados iniciales
  const [vista, setVista] = useState('login'); 
  const [formData, setFormData] = useState({});
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // 2. Funciones de lógica (Manejadores)
  const handleInputChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
    if (error) setError('');
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setFormData({});
    setError('');
    setMensaje('');
  };

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    if (!formData.correo?.includes('@')) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }
    const usuariosExistentes = JSON.parse(localStorage.getItem('psicologos') || '[]');
    if (usuariosExistentes.some(u => u.correo === formData.correo)) {
      setError('Este correo ya está registrado.');
      return;
    }
    usuariosExistentes.push(formData);
    localStorage.setItem('psicologos', JSON.stringify(usuariosExistentes));
    setMensaje('Registro completado con éxito. Redirigiendo...');
    setTimeout(() => cambiarVista('login'), 2000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const usuariosExistentes = JSON.parse(localStorage.getItem('psicologos') || '[]');
    const usuario = usuariosExistentes.find(
      (u) => u.correo === formData.correo && u.contrasena === formData.contrasena
    );
    if (usuario) {
      setUsuarioActivo(usuario);
      setVista('dashboard');
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  // 3. Renderizado Condicional
  if (vista === 'dashboard') {
    return (
      <DashboardPsicologo 
        usuario={usuarioActivo} 
        alCerrarSesion={() => { setUsuarioActivo(null); cambiarVista('login'); }} 
      />
    );
  }

  return (
    <LayoutPortal irA={irA}>
      <div className="auth-card">
        {vista === 'login' ? (
          <div>
            <h2 style={{ textAlign: 'center', color: 'var(--verde-oscuro)' }}>Iniciar Sesión</h2>
            <FormLogin
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleLoginSubmit}
              error={error}
              alCambiarVista={cambiarVista}
            />
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center', color: 'var(--verde-oscuro)' }}>Crear Cuenta</h2>
            <FormRegistro
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleRegistroSubmit}
              error={error}
              mensaje={mensaje}
              alCambiarVista={cambiarVista}
            />
          </div>
        )}
      </div>
    </LayoutPortal>
  );
}