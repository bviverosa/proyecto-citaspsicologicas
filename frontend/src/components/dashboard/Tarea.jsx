import React, { useState } from 'react';

export default function Tareas() {
  // Cargamos tareas y pacientes desde el almacenamiento local
  const [tareas, setTareas] = useState(JSON.parse(localStorage.getItem('tareas') || '[]'));
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]'); 
  
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    paciente: '',
    descripcion: '',
    fechaLimite: '',
    estado: 'Pendiente'
  });

  const guardarTarea = () => {
    // Validación básica
    if (!nuevaTarea.paciente || !nuevaTarea.descripcion) {
      alert('Por favor selecciona un paciente y escribe la descripción de la tarea.');
      return;
    }

    const listaActualizada = [...tareas, nuevaTarea];
    setTareas(listaActualizada);
    localStorage.setItem('tareas', JSON.stringify(listaActualizada));
    
    // Limpiamos y ocultamos el formulario
    setMostrarForm(false);
    setNuevaTarea({ paciente: '', descripcion: '', fechaLimite: '', estado: 'Pendiente' });
  };

  const marcarComoCompletada = (index) => {
    const listaActualizada = [...tareas];
    listaActualizada[index].estado = 'Completada';
    setTareas(listaActualizada);
    localStorage.setItem('tareas', JSON.stringify(listaActualizada));
  };

  return (
    <div className="tareas-container" style={{ padding: '20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--verde-oscuro)' }}>Asignación de Tareas</h2>
        <button className="btn-nav" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Asignar Tarea'}
        </button>
      </div>

      {/* Formulario para asignar nueva tarea */}
      {mostrarForm && (
        <div style={{ background: '#f0f4f0', padding: '20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Selector de pacientes dinámico */}
          <select 
            value={nuevaTarea.paciente} 
            onChange={(e) => setNuevaTarea({...nuevaTarea, paciente: e.target.value})}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flexGrow: 1 }}
          >
            <option value="">-- Selecciona un Paciente --</option>
            {pacientes.map((p, index) => (
              <option key={index} value={p.nombre}>{p.nombre}</option>
            ))}
          </select>

          <input 
            placeholder="Descripción de la tarea (ej. Diario de emociones)" 
            value={nuevaTarea.descripcion} 
            onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})} 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flexGrow: 2 }} 
          />
          
          <input 
            type="date" 
            value={nuevaTarea.fechaLimite} 
            onChange={(e) => setNuevaTarea({...nuevaTarea, fechaLimite: e.target.value})} 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
          
          <button className="btn-nav" onClick={guardarTarea}>Guardar Tarea</button>
        </div>
      )}

      {/* Lista de Tareas */}
      <div className="tareas-list" style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {tareas.length > 0 ? (
          tareas.map((tarea, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px', 
              borderBottom: '1px solid #eee',
              opacity: tarea.estado === 'Completada' ? 0.6 : 1 /* Efecto visual si está completada */
            }}>
              <div>
                <strong>{tarea.descripcion}</strong>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>
                  👤 Paciente: {tarea.paciente} | 📅 Límite: {tarea.fechaLimite || 'Sin fecha'}
                </p>
                <span style={{ 
                  fontSize: '0.8rem', 
                  padding: '3px 8px', 
                  borderRadius: '12px', 
                  background: tarea.estado === 'Completada' ? '#d4edda' : '#fff3cd',
                  color: tarea.estado === 'Completada' ? '#155724' : '#856404'
                }}>
                  {tarea.estado}
                </span>
              </div>
              
              {tarea.estado !== 'Completada' && (
                <button 
                  onClick={() => marcarComoCompletada(index)}
                  style={{ background: 'var(--verde-oscuro)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  ✓ Completar
                </button>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No hay tareas asignadas.</p>
        )}
      </div>
    </div>
  );
}