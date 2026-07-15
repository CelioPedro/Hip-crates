import { Dna, Heartbeat, Brain, Scan, ChartLineUp, DotsThree } from "@phosphor-icons/react";

export default function Specialties() {
  const specialties = [
    {
      title: "Genética e Medicina Personalizada",
      desc: "Planos de tratamento baseados no genoma do paciente.",
      icon: <Dna size={24} weight="duotone" />
    },
    {
      title: "Radiologia e Diagnóstico",
      desc: "Análise avançada de imagem com precisão algorítmica.",
      icon: <Scan size={24} weight="duotone" />
    },
    {
      title: "Oncologia de Precisão",
      desc: "Imunoterapia e tratamentos guiados por biologia molecular.",
      icon: <Heartbeat size={24} weight="duotone" />
    },
    {
      title: "Neurologia e Neurociência",
      desc: "Tratamentos neuromoduladores e mapeamento cerebral.",
      icon: <Brain size={24} weight="duotone" />
    },
    {
      title: "Medicina Preventiva e Longevidade",
      desc: "Análise preditiva para antecipar riscos à saúde.",
      icon: <ChartLineUp size={24} weight="duotone" />
    }
  ];

  return (
    <section className="bottom">
      <div className="doctor-cluster reveal">
        <div className="clay-card doctor-card">
          <div className="doctor-avatar" aria-hidden="true">
            <img src="https://i.pravatar.cc/150?img=47" alt="Médico" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="doctor-meta">
            <div className="name">Dra. Sarah Johnson</div>
            <div className="role">Chief Medical Officer</div>
          </div>
          <button className="search-btn" aria-label="Pesquisar">
            <DotsThree weight="bold" />
          </button>
        </div>
        
        <div className="info-grid">
          <div className="clay-card info-card">
            <span className="ic-head">
              <Scan size={18} />
              Triagem IA
            </span>
            <p>Classificação inteligente e rápida de sintomas do paciente.</p>
          </div>
          <div className="clay-card info-card">
            <span className="ic-head">
              <ChartLineUp size={18} />
              Integração
            </span>
            <p>Agendamento direto no prontuário eletrônico da clínica.</p>
          </div>
        </div>
      </div>

      <div className="treatments reveal">
        {specialties.slice(0, 3).map((item, index) => (
          <article className="clay-card treatment" key={index} style={{ marginBottom: index !== 2 ? '14px' : '0' }}>
            <div className="head">
              <span className="icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 style={{ fontSize: '15px' }}>{item.title}</h3>
              <button className="menu-dots" aria-label="Mais">
                <DotsThree weight="bold" />
              </button>
            </div>
            <p style={{ fontSize: '14px', margin: '4px 0 0 0' }}>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
