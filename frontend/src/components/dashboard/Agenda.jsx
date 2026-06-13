import React, { useState } from 'react';

export default function Agenda() {
  const [citas, setCitas] = useState(JSON.parse(localStorage.getItem('citas') || '[]'));
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({ nombrePaciente: '', fecha: '', hora: '' });

  const guardarCita = () => {
    const listaActualizada = [...citas, nuevaCita];
    setCitas(listaActualizada);
    localStorage.setItem('citas', JSON.stringify(listaActualizada));
    setMostrarForm(false); // Ocultar formulario tras guardar
    setNuevaCita({ nombrePaciente: '', fecha: '', hora: '' }); // Limpiar campos
  };

  return (
    <div className="agenda-container" style={{ padding: '20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--verde-oscuro)' }}>Mi Agenda</h2>
        <button className="btn-nav" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Nueva Cita'}
        </button>
      </div>

      {/* Formulario de creación */}
      {mostrarForm && (
        <div style={{ background: '#f0f4f0', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <input placeholder="Nombre del Paciente" value={nuevaCita.nombrePaciente} onChange={(e) => setNuevaCita({...nuevaCita, nombrePaciente: e.target.value})} style={{ marginRight: '10px', padding: '8px' }} />
          <input type="date" value={nuevaCita.fecha} onChange={(e) => setNuevaCita({...nuevaCita, fecha: e.target.value})} style={{ marginRight: '10px', padding: '8px' }} />
          <input type="time" value={nuevaCita.hora} onChange={(e) => setNuevaCita({...nuevaCita, hora: e.target.value})} style={{ marginRight: '10px', padding: '8px' }} />
          <button className="btn-nav" onClick={guardarCita}>Guardar</button>
        </div>
      )}

      {/* Lista de citas */}
      <div className="agenda-list" style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {citas.length > 0 ? (
          citas.map((cita, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
              <div>
                <strong>{cita.nombrePaciente}</strong>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>{cita.fecha} | {cita.hora}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '40px' }}>No hay citas programadas.</p>
        )}
      </div>
    </div>
  );
}