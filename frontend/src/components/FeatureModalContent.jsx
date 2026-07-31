import React from 'react';
import gsap from 'gsap';
import './FeatureModalContent.css';
import { ChartLineUp, ShieldCheck, Dna, Scan, Heartbeat } from "@phosphor-icons/react";

const contentMap = {
  genetics: {
    title: "Genética e Medicina Personalizada",
    description: "Nossa IA de bioinformática processa terabytes de dados genômicos em minutos para criar um perfil preditivo individualizado, antecipando riscos e direcionando os melhores tratamentos para o seu DNA.",
    tags: ["Sequenciamento", "CRISPR-Cas9", "Bioinformática", "Genoma"],
    metrics: [
      { icon: <Dna size={24} weight="duotone" />, label: "Mapeamento Genômico", value: "99.9%" },
      { icon: <ChartLineUp size={24} weight="duotone" />, label: "Previsibilidade", value: "+85%" }
    ],
    details: "Utilizamos arquiteturas de Transformer para cruzar seu sequenciamento de nova geração (NGS) com o maior banco de dados farmacogenômico do mundo. Isso garante que cada medicamento prescrito tenha o mínimo de efeitos colaterais e a máxima eficácia, respeitando a sua biologia única."
  },
  radiology: {
    title: "Radiologia e Diagnóstico",
    description: "Algoritmos de Visão Computacional (Deep Learning) treinados em milhões de exames radiológicos conseguem detectar micro-anomalias que muitas vezes escapam ao olho clínico humano inicial.",
    tags: ["Deep Learning", "Visão Computacional", "Tomografia 3D", "Redes Neurais"],
    metrics: [
      { icon: <Scan size={24} weight="duotone" />, label: "Detecção Precoce", value: "Avançada" },
      { icon: <ChartLineUp size={24} weight="duotone" />, label: "Redução de Falsos Negativos", value: "-40%" }
    ],
    details: "As imagens da sua ressonância magnética ou tomografia são instantaneamente vetorizadas e analisadas por redes neurais convolucionais (CNNs). O Hipócrates destaca as áreas de interesse para o radiologista parceiro, acelerando o laudo e aumentando drasticamente a precisão diagnóstica."
  },
  oncology: {
    title: "Oncologia de Precisão",
    description: "Tratamentos oncológicos deixam de ser uma tentativa e erro. Cruzamos as mutações do seu tumor com os protocolos clínicos mais modernos e terapias-alvo em nível global.",
    tags: ["Imunoterapia", "Terapias-Alvo", "Biologia Molecular", "Onco-IA"],
    metrics: [
      { icon: <Heartbeat size={24} weight="duotone" />, label: "Compatibilidade de Terapia", value: "Exata" },
      { icon: <ShieldCheck size={24} weight="duotone" />, label: "Sobrevida e Qualidade", value: "Foco Total" }
    ],
    details: "A inteligência artificial do Hipócrates não só identifica o tipo específico e a biologia molecular do tumor, mas também rastreia em tempo real os testes clínicos e as imunoterapias mais promissoras disponíveis, entregando um dossiê oncológico completo para a sua equipe médica."
  }
};

function AnimatedMetricValue({ valueString }) {
  const valRef = React.useRef(null);
  const numMatch = valueString.match(/^([+-]?)\s*([\d.]+)\s*(.*)$/);

  React.useEffect(() => {
    if (numMatch && valRef.current) {
      const prefix = numMatch[1];
      const number = parseFloat(numMatch[2]);
      const suffix = numMatch[3];
      const isFloat = numMatch[2].includes('.');

      const obj = { val: 0 };
      gsap.to(obj, {
        val: number,
        duration: 3,
        ease: "expo.out",
        onUpdate: () => {
          if (valRef.current) {
            valRef.current.innerText = `${prefix}${obj.val.toFixed(isFloat ? 1 : 0)}${suffix}`;
          }
        }
      });
    }
  }, [valueString, numMatch]);

  if (!numMatch) {
    return <span>{valueString}</span>;
  }

  return <span ref={valRef}>0</span>;
}

export default function FeatureModalContent({ featureKey }) {
  const content = contentMap[featureKey];

  if (!content) return null;

  return (
    <div className="feature-modal-container">
      <div className="feature-hero-section">
        <p className="feature-description">{content.description}</p>
      </div>

      <div className="feature-tags-wrapper">
        {content.tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <span className="feature-tag">{tag}</span>
            {index < content.tags.length - 1 && (
              <span className="feature-tag-separator" aria-hidden="true">•</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="feature-metrics-grid">
        {content.metrics.map((metric, i) => (
          <div key={i} className="feature-metric-card">
            <div className="feature-metric-icon">{metric.icon}</div>
            <div className="feature-metric-info">
              <span className="feature-metric-value">
                <AnimatedMetricValue valueString={metric.value} />
              </span>
              <span className="feature-metric-label">{metric.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="feature-details-section">
        <h4 className="feature-details-title">Como a IA atua na prática</h4>
        <p className="feature-details-text">{content.details}</p>
      </div>
    </div>
  );
}
