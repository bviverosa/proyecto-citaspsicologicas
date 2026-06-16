import React, { useState } from 'react';

export default function CrearPaciente({ usuario }) {
    const [datosPaciente, setDatosPaciente] = useState({
        nombre: '',
        fechaNacimiento: '',
        genero: '',
        estadoCivil: '',
        domicilio: '',
        telefono: '',
        ocupacion: '',
        escolaridad: '',
        consentimiento: false
    });

    const manejarCambio = (e) => {
        const { id, value, type, checked } = e.target;
        setDatosPaciente({
            ...datosPaciente,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault(); 

        if (!datosPaciente.consentimiento) {
            alert("El paciente debe aceptar el consentimiento informado.");
            return;
        }

        const pacientesActuales = JSON.parse(localStorage.getItem('pacientes') || '[]');
        
        // Se agrega el ID único y la etiqueta del psicólogo activo
        const nuevoPaciente = {
            ...datosPaciente,
            id: Date.now().toString(),
            psicologoId: usuario.correo
        };

        const listaActualizada = [...pacientesActuales, nuevoPaciente];
        localStorage.setItem('pacientes', JSON.stringify(listaActualizada));

        alert(`Paciente ${datosPaciente.nombre} registrado con éxito en el sistema.`);

        setDatosPaciente({
            nombre: '', fechaNacimiento: '', genero: '', estadoCivil: '',
            domicilio: '', telefono: '', ocupacion: '', escolaridad: '', consentimiento: false
        });
    };

    return (
        <div className="main-container form-crear-paciente">
            <div className="form-card">
                <h2>1. Expediente Clínico & Alta de Pacientes</h2>
                
                <form id="formRegistroPaciente" onSubmit={manejarEnvio}>
                    
                    <fieldset className="form-section">
                        <legend>Ficha de Identificación Básica</legend>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Completo:</label>
                                <input type="text" id="nombre" placeholder="Nombre del paciente" value={datosPaciente.nombre} onChange={manejarCambio} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                                <input type="date" id="fechaNacimiento" value={datosPaciente.fechaNacimiento} onChange={manejarCambio} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="genero">Género:</label>
                                <select id="genero" value={datosPaciente.genero} onChange={manejarCambio} required>
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="estadoCivil">Estado Civil:</label>
                                <select id="estadoCivil" value={datosPaciente.estadoCivil} onChange={manejarCambio} required>
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="Soltero/a">Soltero/a</option>
                                    <option value="Casado/a">Casado/a</option>
                                    <option value="Divorciado/a">Divorciado/a</option>
                                    <option value="Viudo/a">Viudo/a</option>
                                    <option value="Unión Libre">Unión Libre</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="form-section">
                        <legend>Contacto y Datos Generales</legend>
                        <div className="form-grid">
                            <div className="form-group grid-col-2">
                                <label htmlFor="domicilio">Domicilio:</label>
                                <input type="text" id="domicilio" placeholder="Calle, número, colonia y municipio" value={datosPaciente.domicilio} onChange={manejarCambio} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono:</label>
                                <input type="tel" id="telefono" placeholder="10 dígitos" pattern="[0-9]{10}" value={datosPaciente.telefono} onChange={manejarCambio} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ocupacion">Ocupación:</label>
                                <input type="text" id="ocupacion" placeholder="Profesión u oficio" value={datosPaciente.ocupacion} onChange={manejarCambio} required />
                            </div>

                            <div className="form-group grid-col-2">
                                <label htmlFor="escolaridad">Escolaridad:</label>
                                <select id="escolaridad" value={datosPaciente.escolaridad} onChange={manejarCambio} required>
                                    <option value="" disabled>Seleccione el último grado académico</option>
                                    <option value="Primaria">Primaria</option>
                                    <option value="Secundaria">Secundaria</option>
                                    <option value="Preparatoria">Preparatoria / Bachillerato</option>
                                    <option value="Licenciatura">Licenciatura / Ingeniería</option>
                                    <option value="Posgrado">Posgrado</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <div className="consent-container">
                        <input type="checkbox" id="consentimiento" checked={datosPaciente.consentimiento} onChange={manejarCambio} required />
                        <label htmlFor="consentimiento">El paciente firma y acepta el Consentimiento Informado</label>
                    </div>

                    <button type="submit" className="btn-submit">Registrar en Expediente</button>
                </form>
            </div>
        </div>
    );
}