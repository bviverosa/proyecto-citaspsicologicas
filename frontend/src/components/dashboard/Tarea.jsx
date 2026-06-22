import React, { useState } from 'react';

export default function Tareas({ usuario }) {
  const correoActual = usuario.correo;

  // Solo vemos las tareas de este psicólogo
  const [tareasLocales, setTareasLocales] = useState(() => {
    const todasLasTareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    return todasLasTareas.filter(t => t.psicologoId === correoActual);
  });

  // Solo cargamos los pacientes de este psicólogo
  const misPacientes = JSON.parse(localStorage.getItem('pacientes') || '[]')
    .filter(p => p.psicologoId === correoActual);
  
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({ paciente: '', descripcion: '', fechaLimite: '', estado: 'Pendiente' });

  const guardarTarea = () => {
    if (!nuevaTarea.paciente || !nuevaTarea.descripcion) {
      alert('Por favor selecciona un paciente y escribe la descripción.');
      return;
    }

    const tareaProtegida = {
      ...nuevaTarea,
      id: Date.now().toString(),
      psicologoId: correoActual
    };

    const nuevasTareasLocales = [...tareasLocales, tareaProtegida];
    setTareasLocales(nuevasTareasLocales);
    
    // Guardamos sin borrar la de los demás
    const todasLasTareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const otrasTareas = todasLasTareas.filter(t => t.psicologoId !== correoActual);
    localStorage.setItem('tareas', JSON.stringify([...otrasTareas, ...nuevasTareasLocales]));
    
    setMostrarForm(false);
    setNuevaTarea({ paciente: '', descripcion: '', fechaLimite: '', estado: 'Pendiente' });
  };

  const marcarComoCompletada = (idTarea) => {
    // 1. Actualizamos la vista local
    const nuevasTareasLocales = tareasLocales.map(t => 
      t.id === idTarea ? { ...t, estado: 'Completada' } : t
    );
    setTareasLocales(nuevasTareasLocales);

    // 2. Actualizamos el almacenamiento global buscando por ID único
    const todasLasTareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const bdActualizada = todasLasTareas.map(t => 
      t.id === idTarea ? { ...t, estado: 'Completada' } : t
    );
    localStorage.setItem('tareas', JSON.stringify(bdActualizada));
  };

  return (
    <div className="tareas-container" style={{ padding: '20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--verde-oscuro)' }}>Asignación de Tareas</h2>
        <button className="btn-nav" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Asignar Tarea'}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: '#f0f4f0', padding: '20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select 
            value={nuevaTarea.paciente} 
            onChange={(e) => setNuevaTarea({...nuevaTarea, paciente: e.target.value})}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flexGrow: 1 }}
          >
            <option value="">-- Selecciona un Paciente --</option>
            {misPacientes.map((p, index) => (
              <option key={index} value={p.nombre}>{p.nombre}</option>
            ))}
          </select>
          <input placeholder="Descripción (ej. Diario de emociones)" value={nuevaTarea.descripcion} onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flexGrow: 2 }} />
          <input type="date" value={nuevaTarea.fechaLimite} onChange={(e) => setNuevaTarea({...nuevaTarea, fechaLimite: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <button className="btn-nav" onClick={guardarTarea}>Guardar Tarea</button>
        </div>
      )}

      <div className="tareas-list" style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {tareasLocales.length > 0 ? (
          tareasLocales.map((tarea) => (
            <div key={tarea.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee', opacity: tarea.estado === 'Completada' ? 0.6 : 1 }}>
              <div>
                <strong>{tarea.descripcion}</strong>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>👤 Paciente: {tarea.paciente} | 📅 Límite: {tarea.fechaLimite || 'Sin fecha'}</p>
                <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: tarea.estado === 'Completada' ? '#d4edda' : '#fff3cd', color: tarea.estado === 'Completada' ? '#155724' : '#856404' }}>{tarea.estado}</span>
              </div>
              
              {tarea.estado !== 'Completada' && (
                <button 
                  onClick={() => marcarComoCompletada(tarea.id)}
                  style={{ background: 'var(--verde-oscuro)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  ✓ Completar
                </button>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No has asignado tareas a tus pacientes.</p>
        )}
      </div>
    </div>
  );
}