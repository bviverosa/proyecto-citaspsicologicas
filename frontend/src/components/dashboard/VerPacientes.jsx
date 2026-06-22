import React, { useState } from 'react';

export default function VerPacientes({ usuario }) {
    const correoActual = usuario.correo;
    const [misPacientes, setMisPacientes] = useState(() => {
        const todosLosPacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
        return todosLosPacientes.filter(p => p.psicologoId === correoActual);
    });

    return (
        <div className="ver-pacientes-container" style={{ width: '100%' }}>
            <div className="form-card" style={{ padding: '35px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
                <h2 style={{ color: 'var(--verde-oscuro)', marginBottom: '20px', fontSize: '1.7rem' }}>
                    Directorio de Pacientes
                </h2>
                
                <div className="table-responsive">
                    <table className="pacientes-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>F. Nacimiento</th>
                                <th>Género</th>
                                <th>Estado Civil</th>
                                <th>Teléfono</th>
                                <th>Ocupación</th>
                                <th>Escolaridad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {misPacientes.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="no-data">No tienes pacientes registrados actualmente.</td>
                                </tr>
                            ) : (
                                misPacientes.map((p) => (
                                    <tr key={p.id}>
                                        <td><strong>{p.nombre}</strong></td>
                                        <td>{p.fechaNacimiento}</td>
                                        <td>{p.genero}</td>
                                        <td>{p.estadoCivil}</td>
                                        <td>{p.telefono}</td>
                                        <td>{p.ocupacion}</td>
                                        <td>{p.escolaridad}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}