// src/components/sections/SeccionRelax.jsx
import React, { useState, useEffect, useRef } from 'react';
import audioLluvia from '../../public/lluvia.mp3';

export default function SeccionRelax() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [activo, setActivo] = useState(false);
  const [instruccion, setInstruccion] = useState('Presiona Iniciar para comenzar');
  const faseRef = useRef(0);
  const activoRef = useRef(false);

  const FASES = [
    { nombre: 'Inhala', duracion: 4, color: '#8FA991', rMin: 55, rMax: 85 },
    { nombre: 'Sostén', duracion: 7, color: '#547A6A', rMin: 85, rMax: 85 },
    { nombre: 'Exhala', duracion: 8, color: '#A6D2B6', rMin: 85, rMax: 55 },
  ];

  const dibujar = (r, color, texto) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    ctx.beginPath();
    ctx.arc(100, 100, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.font = "bold 15px 'Segoe UI', sans-serif";
    ctx.fillStyle = '#2c4a3e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, 100, 100);
  };

  const correrFase = () => {
    if (!activoRef.current) return;
    const fase = FASES[faseRef.current];
    const durMs = fase.duracion * 1000;
    const inicio = performance.now();

    const tick = (ahora) => {
      if (!activoRef.current) return;
      const t = Math.min((ahora - inicio) / durMs, 1);
      const r = fase.rMin + (fase.rMax - fase.rMin) * t;
      const secsLeft = Math.ceil(fase.duracion * (1 - t));
      setInstruccion(`${fase.nombre} (${secsLeft}s)`);
      dibujar(Math.round(r), fase.color, `${secsLeft}s`);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        faseRef.current = (faseRef.current + 1) % 3;
        correrFase();
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const toggle = () => {
    if (activo) {
      activoRef.current = false;
      setActivo(false);
      cancelAnimationFrame(animRef.current);
      setInstruccion('Presiona Iniciar para comenzar');
      dibujar(70, '#e8f4ee', 'Listo');
    } else {
      activoRef.current = true;
      faseRef.current = 0;
      setActivo(true);
      correrFase();
    }
  };

  useEffect(() => {
    dibujar(70, '#e8f4ee', 'Listo');
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div>
      <div className="relajacion-grid">
        <div className="video-box">
          <h3>🎥 Video: Técnica de relajación</h3>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
            Guía completa con respiración y visualización:
          </p>
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/fFD3iLA1lVY"
            title="Video de relajación SerenaMente"
            allowFullScreen
          />
        </div>
        <div className="audio-box">
          <h3>🎵 Audio: Meditación guiada</h3>
          <p>Sonidos de naturaleza para calmar la mente y reducir el estrés.</p>
          <audio controls>
            <source src={audioLluvia} type="audio/mpeg" />
            Tu navegador no soporta el elemento audio.
          </audio>
          <ol>
            <li>Busca un lugar cómodo y silencioso</li>
            <li>Cierra los ojos suavemente</li>
            <li>Escucha sin distracciones</li>
            <li>Si tu mente divaga, vuelve al sonido</li>
          </ol>
        </div>
      </div>

      <div className="canvas-box">
        <h3>🫁 Respiración 4-7-8</h3>
        <p>
          Inhala 4 segundos → Sostén 7 segundos → Exhala 8 segundos.<br />
          Activa el sistema nervioso parasimpático y reduce la ansiedad rápidamente.
        </p>
        <canvas ref={canvasRef} width={200} height={200} />
        <div className="canvas-instruccion">{instruccion}</div>
        <button className="btn-respiracion" onClick={toggle}>
          {activo ? 'Detener' : 'Iniciar'}
        </button>
      </div>

      <div className="pasos-box">
        <h3>Relajación muscular progresiva de Jacobson</h3>
        <ol>
          <li>Siéntate o recuéstate en una posición cómoda</li>
          <li>Cierra los ojos y respira profundamente 3 veces</li>
          <li>Tensa los pies durante 5 segundos, luego suéltalos</li>
          <li>Sube por pantorrillas, muslos y glúteos</li>
          <li>Tensa el abdomen, pecho y hombros, luego relaja</li>
          <li>Aprieta los puños y brazos, después suelta</li>
          <li>Arruga el rostro 5 segundos y libera toda tensión</li>
          <li>Permanece en quietud 2 minutos sintiendo la relajación</li>
        </ol>
      </div>
    </div>
  );
}