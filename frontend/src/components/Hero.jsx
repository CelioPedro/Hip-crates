import { ArrowCircleRight, Infinity } from "@phosphor-icons/react";

export default function Hero({ onStart }) {
  return (
    <section className="hero">
      <span className="eyebrow">Planos de tratamento personalizados</span>

      <h1 className="title">
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
              <Infinity weight="bold" size={24} color="#000" />
            </span>
            <span className="paren">)</span>
          </span>
          <span className="word">REDEFININDO</span>
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

      <div className="badge" aria-hidden="true">
        <svg className="ring" viewBox="0 0 100 100">
          <defs>
            <path id="badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
          </defs>
          <text fontFamily="Inter Tight, sans-serif" fontSize="9.5" fontWeight="500" fill="#2b2b30" letterSpacing="2.4">
            <textPath href="#badge-path">Seguro · Rápido · Acolhedor · </textPath>
          </text>
        </svg>
        <span className="badge-center">
          <Infinity weight="bold" />
        </span>
      </div>
    </section>
  );
}
