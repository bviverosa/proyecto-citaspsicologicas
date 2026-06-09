// src/components/sections/SeccionInicio.jsx
import React from 'react';

export default function SeccionInicio({ irA }) {
  return (
    <div className="seccion activo">
      <div className="hero">
        <div>
          <h1>Tu espacio seguro de bienestar mental</h1>
          <p>
            Explora herramientas de psicoeducación, realiza el test de ansiedad
            de Beck y aprende técnicas de relajación respaldadas por la ciencia.
          </p>
          <button className="hero-btn" onClick={() => irA('test')}>
            Realizar test de ansiedad →
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
          alt="Naturaleza tranquila con lago y montañas"
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>

      <div className="grid-container">
        <article className="icon-card" onClick={() => irA('test')}>
          <div className="icono">📋</div>
          <h3>Test de Beck</h3>
          <p>Evalúa tu nivel de ansiedad con el instrumento clínico más validado.</p>
        </article>
        <article className="icon-card" onClick={() => irA('psico')}>
          <div className="icono">🧠</div>
          <h3>Psicoeducación</h3>
          <p>Aprende qué es la ansiedad y cómo funciona tu mente.</p>
        </article>
        <article className="icon-card" onClick={() => irA('relax')}>
          <div className="icono">🫁</div>
          <h3>Relajación</h3>
          <p>Técnicas de respiración y meditación guiada.</p>
        </article>
        <article className="icon-card" onClick={() => irA('recursos')}>
          <div className="icono">📚</div>
          <h3>Recursos</h3>
          <p>Líneas de crisis, apps recomendadas y lecturas.</p>
        </article>
      </div>

      <div className="summary-card">
        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
        <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--verde-oscuro)' }}>Aviso importante: </strong>
          Esta plataforma tiene fines psicoeducativos únicamente. No reemplaza
          el diagnóstico ni tratamiento de un profesional de salud mental.
        </p>
      </div>
    </div>
  );
}