import React from 'react';

export default function Inicio({ usuario }) {
  const correoActual = usuario.correo;

  // Filtramos todos los datos globales para que solo muestre los de este psicólogo
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]').filter(p => p.psicologoId === correoActual);
  const tareas = JSON.parse(localStorage.getItem('tareas') || '[]').filter(t => t.psicologoId === correoActual && t.estado === 'Pendiente');
  const citas = JSON.parse(localStorage.getItem('citas') || '[]').filter(c => c.psicologoId === correoActual);
  
  const proximaCita = citas.length > 0 ? citas[0] : null;

  return (
    <div className="inicio-dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 style={{ color: 'var(--verde-oscuro)', marginBottom: '3rem', textAlign: 'center', fontSize: '2rem' }}>
        Resumen de Actividades
      </h2>
      
      <div className="grid-2x2">
        <div className="card-stats"><h4>Citas Programadas</h4><p className="big-number">{citas.length}</p></div>
        <div className="card-stats"><h4>Pacientes Activos</h4><p className="big-number">{pacientes.length}</p></div>
        <div className="card-stats"><h4>Tareas Pendientes</h4><p className="big-number">{tareas.length}</p></div>
        <div className="card-stats">
          <h4>Próxima Cita</h4>
          {proximaCita ? (
            <p style={{ marginTop: '10px' }}><strong>{proximaCita.nombrePaciente}</strong> <br/> {proximaCita.fecha} | {proximaCita.hora}</p>
          ) : (
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Sin citas próximas</p>
          )}
        </div>
      </div>
    </div>
  );
}