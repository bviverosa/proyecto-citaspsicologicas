// src/intro.jsx
import React, { useState } from 'react';
import FormLogin from './components/auth/FormLogin.jsx';
import FormRegistro from './components/auth/FormRegistro.jsx';
import DashboardPsicologo from './components/dashboard/DashboardPsicologo.jsx';
import './estilos.css'; // Si tienes estilos específicos para esta sección

export default function Intro() {
  const [vista, setVista] = useState('login'); // 'login' | 'registro' | 'dashboard'
  const [formData, setFormData] = useState({});
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Manejador común para actualizar campos de los formularios
  const handleInputChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor
    }));
    if (error) setError(''); // Limpiar errores al escribir
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setFormData({});
    setError('');
    setMensaje('');
  };

  // Lógica de Envío de Registro
  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de validación y guardado
    if (!formData.correo.includes('@')) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    // Guardar en localStorage para simular persistencia local
    const usuariosExistentes = JSON.parse(localStorage.getItem('psicologos') || '[]');
    const existe = usuariosExistentes.some(u => u.correo === formData.correo);

    if (existe) {
      setError('Este correo ya está registrado.');
      return;
    }

    usuariosExistentes.push(formData);
    localStorage.setItem('psicologos', JSON.stringify(usuariosExistentes));

    setMensaje('Registro completado con éxito. Redirigiendo...');
    setTimeout(() => {
      cambiarVista('login');
    }, 2000);
  };

  // Lógica de Envío de Login
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
      setError('Credenciales incorrectas o usuario no registrado.');
    }
  };

  const handleCerrarSesion = () => {
    setUsuarioActivo(null);
    cambiarVista('login');
  };

  // Renderizado condicional basado en el estado
  if (vista === 'dashboard') {
    return (
      <DashboardPsicologo 
        usuario={usuarioActivo} 
        alCerrarSesion={handleCerrarSesion} 
      />
    );
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {vista === 'login' ? (
          <FormLogin
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleLoginSubmit}
            error={error}
            alCambiarVista={cambiarVista}
          />
        ) : (
          <FormRegistro
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleRegistroSubmit}
            error={error}
            mensaje={mensaje}
            alCambiarVista={cambiarVista}
          />
        )}
      </div>
    </div>
  );
}