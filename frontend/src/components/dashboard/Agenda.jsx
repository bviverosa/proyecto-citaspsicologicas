import React, { useState } from 'react';

export default function Agenda() {
  const [citas, setCitas] = useState(JSON.parse(localStorage.getItem('citas') || '[]'));
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
  
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({ 
    nombrePaciente: '', 
    fecha: '', 
    hora: '',
    folioPago: '' 
  });

  const guardarCita = () => {
    if (!nuevaCita.nombrePaciente || !nuevaCita.fecha || !nuevaCita.hora || !nuevaCita.folioPago) {
      alert('Por favor, completa todos los campos, incluyendo el paciente y el folio de pago.');
      return;
    }

    const listaActualizada = [...citas, nuevaCita];
    
    // Ordenamos las citas por fecha automáticamente al guardar
    listaActualizada.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));
    
    setCitas(listaActualizada);
    localStorage.setItem('citas', JSON.stringify(listaActualizada));
    
    // Limpiar formulario y ocultar
    setMostrarForm(false);
    setNuevaCita({ nombrePaciente: '', fecha: '', hora: '', folioPago: '' });
  };

  return (
    <div className="agenda-container" style={{ padding: '20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--verde-oscuro)' }}>Mi Agenda</h2>
        <button className="btn-nav" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Nueva Cita'}
        </button>
      </div>

      {/* Formulario de creación de citas */}
      {mostrarForm && (
        <div style={{ 
          background: '#f0f4f0', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          
          {/* Selector dinámico de Pacientes */}
          <select 
            value={nuevaCita.nombrePaciente} 
            onChange={(e) => setNuevaCita({...nuevaCita, nombrePaciente: e.target.value})}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flexGrow: 1 }}
          >
            <option value="">-- Selecciona un Paciente --</option>
            {pacientes.map((p, index) => (
              <option key={index} value={p.nombre}>{p.nombre}</option>
            ))}
          </select>

          {/* Campo para el Folio de Pago */}
          <input 
            placeholder="Folio de Pago" 
            value={nuevaCita.folioPago} 
            onChange={(e) => setNuevaCita({...nuevaCita, folioPago: e.target.value})} 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flexGrow: 1 }} 
          />

          <input 
            type="date" 
            value={nuevaCita.fecha} 
            onChange={(e) => setNuevaCita({...nuevaCita, fecha: e.target.value})} 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
          
          <input 
            type="time" 
            value={nuevaCita.hora} 
            onChange={(e) => setNuevaCita({...nuevaCita, hora: e.target.value})} 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
          
          <button className="btn-nav" onClick={guardarCita}>Guardar Cita</button>
        </div>
      )}

      {/* Lista de citas programadas */}
      <div className="agenda-list" style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {citas.length > 0 ? (
          citas.map((cita, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px', 
              borderBottom: '1px solid #eee' 
            }}>
              <div>
                <strong>👤 {cita.nombrePaciente}</strong>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>
                  📅 {cita.fecha} | 🕒 {cita.hora} hrs
                </p>
              </div>
              <div>
                {/* Mostramos el folio de pago con un diseño limpio */}
                <span style={{ 
                  fontSize: '0.85rem', 
                  background: '#e3fafc', 
                  color: '#0b7285', 
                  padding: '6px 12px', 
                  borderRadius: '6px',
                  fontWeight: '500',
                  marginRight: '15px'
                }}>
                  💳 Folio: {cita.folioPago}
                </span>
                <button className="btn-nav">Detalles</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            No hay citas programadas en la agenda.
          </p>
        )}
      </div>
    </div>
  );
}