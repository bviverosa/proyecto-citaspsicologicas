// src/App.jsx
import React from 'react';
import Layout from './components/layout/Layout.jsx';
import SeccionInicio from './components/sections/SeccionInicio.jsx';
import SeccionTest from './components/sections/SeccionTest.jsx';
import SeccionPsico from './components/sections/SeccionPsico.jsx';
import SeccionRelax from './components/sections/SeccionRelax.jsx';
import SeccionRecursos from './components/sections/SeccionRecursos.jsx';
import Intro from './intro.jsx';
import Footer from './components/footer.jsx';
import './estilos.css';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seccion: 'inicio' };
    this.irA = this.irA.bind(this);
  }

  irA(sec) {
    this.setState({ seccion: sec });
  }

  renderContent() {
    const { seccion } = this.state;

    switch (seccion) {
      case 'inicio':
        return (
          <div>
            <h2>Bienvenido/a a SerenaMente</h2>
            <SeccionInicio irA={this.irA} />
          </div>
        );
      case 'test':
        return (
          <div>
            <h2>Inventario de Ansiedad de Beck (BAI)</h2>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Indica qué tan molesto/a te ha sentido por cada síntoma durante la <strong>última semana</strong>.
            </p>
            <SeccionTest />
          </div>
        );
      case 'psico':
        return (
          <div>
            <h2>Psicoeducación sobre Ansiedad</h2>
            <SeccionPsico />
          </div>
        );
      case 'relax':
        return (
          <div>
            <h2>Ejercicios de Relajación</h2>
            <SeccionRelax />
          </div>
        );
      case 'recursos':
        return (
          <div>
            <h2>Recursos y Apoyo Profesional</h2>
            <SeccionRecursos />
          </div>
        );
      default:
        return <h2>Sección no encontrada</h2>;
    }
  }

  render() {
    const { seccion } = this.state;

    // Condicional para el módulo del psicólogo externo
    if (seccion === 'consultorio') {
      return <Intro />;
    }

    return (
      <Layout seccion={seccion} irA={this.irA}>
        {this.renderContent()}
        <Footer />
      </Layout>
    );
  }
}

export default Application;