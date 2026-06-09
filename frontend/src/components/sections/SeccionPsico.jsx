// src/components/sections/SeccionPsico.jsx
import React from 'react';

export default function SeccionPsico() {
  return (
    <div>
      <img
        className="psico-img"
        src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80"
        alt="Persona meditando en paz"
        onError={(e) => (e.target.style.display = 'none')}
      />
      <div className="info-grid">
        <div className="info-box">
          <h3>¿Qué es la ansiedad?</h3>
          <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.7, marginBottom: '12px' }}>
            La ansiedad es una respuesta natural ante situaciones percibidas como
            amenazantes. En niveles moderados nos ayuda a enfrentar retos; el problema
            surge cuando se vuelve excesiva o constante.
          </p>
          <ul>
            <li>Activación del sistema nervioso simpático</li>
            <li>Liberación de adrenalina y cortisol</li>
            <li>Preparación para "luchar o huir"</li>
            <li>Aumento de frecuencia cardíaca</li>
            <li>Tensión muscular generalizada</li>
          </ul>
        </div>
        <div className="info-box">
          <h3>Síntomas más frecuentes</h3>
          <ul>
            <li>Preocupación excesiva y persistente</li>
            <li>Dificultad para concentrarse</li>
            <li>Irritabilidad sin causa aparente</li>
            <li>Tensión muscular o dolores de cabeza</li>
            <li>Problemas para dormir (insomnio)</li>
            <li>Palpitaciones o sensación de ahogo</li>
            <li>Evitación de situaciones temidas</li>
            <li>Pensamientos catastróficos</li>
          </ul>
        </div>
        <div className="info-box">
          <h3>Pasos para manejar la ansiedad</h3>
          <ol>
            <li>Reconoce y nombra lo que sientes</li>
            <li>Practica respiración diafragmática</li>
            <li>Identifica los pensamientos automáticos</li>
            <li>Cuestiona si esos pensamientos son reales</li>
            <li>Activa tu cuerpo con ejercicio moderado</li>
            <li>Establece rutinas de sueño regulares</li>
            <li>Reduce el consumo de cafeína y alcohol</li>
            <li>Busca apoyo profesional si persiste</li>
          </ol>
        </div>
        <div className="info-box">
          <h3>Tipos de trastornos de ansiedad</h3>
          <ul>
            <li><strong>TAG:</strong> Trastorno de Ansiedad Generalizada</li>
            <li><strong>Pánico:</strong> Ataques repentinos e intensos</li>
            <li><strong>Fobia específica:</strong> Miedo irracional a algo concreto</li>
            <li><strong>Fobia social:</strong> Miedo a situaciones sociales</li>
            <li><strong>TEPT:</strong> Tras experiencias traumáticas</li>
            <li><strong>TOC:</strong> Pensamientos obsesivos y compulsiones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}