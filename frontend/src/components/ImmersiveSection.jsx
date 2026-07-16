import React from 'react';
import InteractiveBust from './InteractiveBust';

export default function ImmersiveSection() {
  return (
    <section className="immersive-section" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      margin: '60px 0',
      overflow: 'hidden'
    }}>
      
      {/* Text Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '500px',
        marginRight: 'auto',
        color: 'var(--text)'
      }}>
        <h2 style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          A Inteligência por trás do Cuidado
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', lineHeight: '1.5' }}>
          Explore o nosso modelo preditivo interativo.
          Rotacione e veja como a IA analisa dados complexos em tempo real para conectar você ao especialista correto.
        </p>
      </div>

      {/* 3D Bust Container */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '-10%',
        width: '60%',
        height: '100%',
        zIndex: 1,
      }}>
        <InteractiveBust />
      </div>
      
    </section>
  );
}
