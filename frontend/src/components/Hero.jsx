import { useState, useEffect } from 'react';
import { ArrowCircleRight, Infinity } from "@phosphor-icons/react";

export default function Hero({ onStart }) {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    // Alternate phases every 5 seconds on mobile
    const interval = setInterval(() => {
      setActivePhase(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* DESKTOP LAYOUT */}
      <span className="eyebrow desktop-only">Planos de tratamento personalizados</span>

      <h1 className="title desktop-only">
        <div className="title-line title-line-1">
          <span className="word">MEDICINA COM IA:</span>
        </div>
        <div className="title-line has-desc">
          <p className="title-desc">Com a triagem baseada em inteligência artificial, otimizamos o atendimento reduzindo filas e conectando você ao especialista ideal.</p>
          <span className="paren-group">
            <span className="paren">(</span>
            <span className="avatar-group" aria-hidden="true">
              <img src="https://i.pravatar.cc/100?img=47" alt="User 1" />
              <img src="https://i.pravatar.cc/100?img=33" alt="User 2" />
              <img src="https://i.pravatar.cc/100?img=12" alt="User 3" />
            </span>
            <span className="icon-tile dna-icon">
              <img src={`${import.meta.env.BASE_URL}favmed.svg`} alt="Favmed Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', zIndex: 1, position: 'relative' }} />
            </span>
            <span className="paren">)</span>
          </span>
          <span className="word word-redefinindo">REDEFININDO</span>
        </div>
        <div className="title-line">
          <span className="word">A SAÚDE</span>
          <span className="future-tag">
            <span className="hero-desc-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowCircleRight weight="fill" size={24} /> 
              <span>O futuro é agora — <strong>desbloqueie o potencial da IA</strong></span>
            </span>
          </span>
        </div>
      </h1>

      <div className="badge desktop-only" aria-hidden="true">
        <svg className="ring" viewBox="0 0 100 100">
          <defs>
            <path id="badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
          </defs>
          <text fontFamily="Inter Tight, sans-serif" fontSize="9.5" fontWeight="500" fill="#2b2b30" letterSpacing="2.4">
            <textPath href="#badge-path">Seguro · Rápido · Acolhedor · </textPath>
          </text>
        </svg>
        <span className="badge-center">
          <img src={`${import.meta.env.BASE_URL}favmed.svg`} alt="Favmed Icon" />
        </span>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="mobile-hero-layout">
        
        <div className="hero-phases-container">
          {/* PHASE 0 */}
          <div className={`hero-phase ${activePhase === 0 ? 'active' : ''}`}>
            <h1 className="title">
              <div className="title-line title-line-1">
                <span className="word">MEDICINA</span>
              </div>
              <div className="title-line title-line-2">
                <span className="word">COM IA:</span>
              </div>
              <div className="title-line title-line-3">
                <span className="paren-group">
                  <span className="paren">(</span>
                  <span className="avatar-group" aria-hidden="true">
                    <img src="https://i.pravatar.cc/100?img=47" alt="User 1" />
                    <img src="https://i.pravatar.cc/100?img=33" alt="User 2" />
                    <img src="https://i.pravatar.cc/100?img=12" alt="User 3" />
                  </span>
                  <span className="icon-tile dna-icon">
                    <img src={`${import.meta.env.BASE_URL}favmed.svg`} alt="Favmed Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', zIndex: 1, position: 'relative' }} />
                  </span>
                  <span className="paren">)</span>
                </span>
              </div>
            </h1>
            
            <p className="title-desc">Com a triagem baseada em inteligência artificial, otimizamos o atendimento reduzindo filas e conectando você ao especialista ideal.</p>
          </div>

          {/* PHASE 1 */}
          <div className={`hero-phase ${activePhase === 1 ? 'active' : ''}`}>
            <span className="eyebrow">Planos de tratamento personalizados</span>

            <h1 className="title title-bottom">
              <div className="title-line">
                <span className="word">REDEFININDO</span>
              </div>
              <div className="title-line">
                <span className="word">A SAÚDE</span>
              </div>
            </h1>

            <span className="future-tag">
              <span className="hero-desc-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowCircleRight weight="fill" size={24} /> 
                <span>O futuro é agora — <strong>desbloqueie o potencial da IA</strong></span>
              </span>
            </span>
          </div>
        </div>

        {/* PERSISTENT MOBILE BADGE */}
        <div className="badge mobile-badge" aria-hidden="true">
          <svg className="ring" viewBox="0 0 100 100">
            <defs>
              <path id="mobile-badge-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" fill="none" />
            </defs>
            <text fontFamily="Inter Tight, sans-serif" fontSize="9.5" fontWeight="500" fill="#2b2b30" letterSpacing="2.8">
              <textPath href="#mobile-badge-path">Seguro · Rápido · Acolhedor · </textPath>
            </text>
          </svg>
          <span className="badge-center">
            <img src={`${import.meta.env.BASE_URL}favmed.svg`} alt="Favmed Icon" />
          </span>
        </div>

      </div>
    </section>
  );
}
