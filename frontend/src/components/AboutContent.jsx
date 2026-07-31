import React from 'react';
import './AboutContent.css';

export default function AboutContent() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h3 className="about-subtitle">Redefinindo o futuro do cuidado</h3>
        <p className="about-text-main">
          O <strong>Hipócrates</strong> nasceu da visão de que a medicina aliada à inteligência artificial pode salvar vidas antes mesmo que a emergência aconteça.
        </p>
      </div>

      <div className="about-content-grid">
        <div className="about-info-block">
          <h4>Nossa Missão</h4>
          <p>Democratizar o acesso ao diagnóstico rápido, conectando pacientes aos melhores especialistas através de uma triagem algorítmica de altíssima precisão.</p>
        </div>
        <div className="about-info-block">
          <h4>Tecnologia e Empatia</h4>
          <p>Acreditamos que a IA não substitui o calor humano. Nossa inteligência remove a burocracia das filas, devolvendo aos médicos o tempo necessário para o que realmente importa: <strong>cuidar de você.</strong></p>
        </div>
        <div className="about-info-block">
          <h4>Segurança de Dados</h4>
          <p>Toda a sua jornada clínica é anonimizada e protegida pelas mais rigorosas diretrizes globais de privacidade em saúde digital.</p>
        </div>
      </div>
      
      <div className="about-footer">
        <img src="/Logo01.svg" alt="Hipócrates Logo" className="about-footer-logo" />
        <span>V 2.0.4 — Sistema Operacional Clínico</span>
      </div>
    </div>
  );
}
