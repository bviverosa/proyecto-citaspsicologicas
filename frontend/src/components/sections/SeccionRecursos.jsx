// src/components/sections/SeccionRecursos.jsx
import React from 'react';

export default function SeccionRecursos() {
  return (
    <div>
      <table className="recursos-tabla">
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Tipo</th>
            <th>Disponibilidad</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SAPTEL</strong> — Atención Psicológica Telefónica</td>
            <td><span className="badge badge-verde">Línea de crisis</span></td>
            <td>24/7</td>
            <td>55 5259-8121</td>
          </tr>
          <tr>
            <td><strong>IMSS</strong> — Salud Mental</td>
            <td><span className="badge badge-verde">Servicio público</span></td>
            <td>Días hábiles</td>
            <td>800 890-0024</td>
          </tr>
          <tr>
            <td><strong>Línea de la Vida</strong> — SSA</td>
            <td><span className="badge badge-verde">Línea de crisis</span></td>
            <td>24/7</td>
            <td>800 911-2000</td>
          </tr>
          <tr>
            <td><strong>Calm</strong> — Meditación y sueño</td>
            <td><span className="badge badge-gris">App</span></td>
            <td>iOS / Android</td>
            <td>calm.com</td>
          </tr>
          <tr>
            <td><strong>Headspace</strong> — Mindfulness guiado</td>
            <td><span className="badge badge-gris">App</span></td>
            <td>iOS / Android</td>
            <td>headspace.com</td>
          </tr>
          <tr>
            <td><strong>IPN CICS UST</strong> — Centro de Atención y Prevención Psicológica CAPPSI</td>
            <td><span className="badge badge-verde">Clínica</span></td>
            <td>Días hábiles</td>
            <td>5557296000 Ext 63443</td>
          </tr>
          <tr>
            <td><strong>UNAM FES Iztacala</strong> — Clínica psicológica</td>
            <td><span className="badge badge-verde">Clínica</span></td>
            <td>Días hábiles</td>
            <td>55 5623-1333</td>
          </tr>
        </tbody>
      </table>

      <div className="info-grid">
        <div className="info-box">
          <h3>📖 Lecturas recomendadas</h3>
          <ul>
            <li>El poder del ahora — Eckhart Tolle</li>
            <li>La trampa de la felicidad — Russ Harris</li>
            <li>Cuando el cuerpo dice no — Gabor Maté</li>
            <li>Ansiedad — David D. Burns</li>
            <li>Mindfulness para principiantes — Jon Kabat-Zinn</li>
          </ul>
        </div>
        <div className="info-box">
          <h3>🌐 Sitios web confiables</h3>
          <ul>
            <li>OMS — Salud Mental (who.int)</li>
            <li>APA — American Psychological Association</li>
            <li>INPRFM — Instituto Nacional de Psiquiatría</li>
            <li>Psychology Today — psychologytoday.com</li>
            <li>Fundación UNAM — Salud Mental</li>
          </ul>
        </div>
      </div>
    </div>
  );
}