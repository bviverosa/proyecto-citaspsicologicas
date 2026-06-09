// src/components/sections/SeccionTest.jsx
import React, { useState } from 'react';
import { PREGUNTAS, OPCIONES } from '../../data/beckData';

export default function SeccionTest() {
  const [pagina, setPagina] = useState(0);
  const [respuestas, setRespuestas] = useState(new Array(21).fill(null));
  const [terminado, setTerminado] = useState(false);

  const seleccionar = (i) => {
    const nueva = [...respuestas];
    nueva[pagina] = i;
    setRespuestas(nueva);
  };

  const progreso = Math.round(((pagina + 1) / PREGUNTAS.length) * 100);
  const mostrarResultado = () => setTerminado(true);
  
  const reiniciar = () => {
    setPagina(0);
    setRespuestas(new Array(21).fill(null));
    setTerminado(false);
  };

  if (terminado) {
    const total = respuestas.reduce((a, b) => a + (b || 0), 0);
    let nivel, desc, color;
    
    if (total <= 7) {
      nivel = 'Ansiedad mínima'; color = '#547A6A';
      desc = 'Tu puntaje indica muy poca o ninguna ansiedad. Continúa cuidando tus hábitos de bienestar.';
    } else if (total <= 15) {
      nivel = 'Ansiedad leve'; color = '#BA7517';
      desc = 'Presentas síntomas leves. Practica técnicas de relajación y manejo del estrés regularmente.';
    } else if (total <= 25) {
      nivel = 'Ansiedad moderada'; color = '#D85A30';
      desc = 'Tu nivel de ansiedad es moderado. Se recomienda buscar orientación profesional.';
    } else {
      nivel = 'Ansiedad severa'; color = '#E24B4A';
      desc = 'Presentas síntomas significativos. Es importante consultar con un profesional a la brevedad.';
    }

    return (
      <div className="test-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '100%' }} />
        </div>
        <div className="resultado-box">
          <div className="resultado-puntaje" style={{ color }}>{total}</div>
          <div className="resultado-nivel" style={{ color }}>{nivel}</div>
          <div className="resultado-desc">{desc}</div>
          <table className="tabla-niveles">
            <thead>
              <tr><th>Puntaje</th><th>Nivel</th><th>Recomendación</th></tr>
            </thead>
            <tbody>
              <tr className={total <= 7 ? 'fila-activa' : ''}>
                <td>0 – 7</td><td>Mínima</td><td>Mantener hábitos saludables</td>
              </tr>
              <tr className={total >= 8 && total <= 15 ? 'fila-activa' : ''}>
                <td>8 – 15</td><td>Leve</td><td>Técnicas de relajación</td>
              </tr>
              <tr className={total >= 16 && total <= 25 ? 'fila-activa' : ''}>
                <td>16 – 25</td><td>Moderada</td><td>Orientación psicológica</td>
              </tr>
              <tr className={total >= 26 ? 'fila-activa' : ''}>
                <td>26 – 63</td><td>Severa</td><td>Atención profesional urgente</td>
              </tr>
            </tbody>
          </table>
          <button className="btn-reiniciar" onClick={reiniciar}>Realizar de nuevo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="test-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: progreso + '%' }} />
      </div>
      <div className="pregunta-num">Pregunta {pagina + 1} de {PREGUNTAS.length}</div>
      <div className="pregunta-texto">{PREGUNTAS[pagina]}</div>
      <div className="opciones">
        {OPCIONES.map((op, i) => (
          <button
            key={i}
            className={'opcion' + (respuestas[pagina] === i ? ' seleccionada' : '')}
            onClick={() => seleccionar(i)}
          >
            {op}
          </button>
        ))}
      </div>
      <div className="nav-test">
        <button
          className="btn-test btn-prev"
          onClick={() => setPagina(pagina - 1)}
          disabled={pagina === 0}
        >
          ← Anterior
        </button>
        <button
          className="btn-test btn-next"
          onClick={() => pagina === PREGUNTAS.length - 1 ? mostrarResultado() : setPagina(pagina + 1)}
          disabled={respuestas[pagina] === null}
        >
          {pagina === PREGUNTAS.length - 1 ? 'Ver resultado' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}