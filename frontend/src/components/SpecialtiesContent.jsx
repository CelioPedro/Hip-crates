import React from 'react';
import { Brain, Heartbeat, Baby, Bone, Dna, Eye, Virus, Plus, ChartLineUp } from "@phosphor-icons/react";
import './SpecialtiesContent.css';

const specialties = [
  { id: 1, name: "Neurologia IA", icon: Brain, desc: "Análise preditiva de padrões cerebrais." },
  { id: 2, name: "Cardiologia", icon: Heartbeat, desc: "Monitoramento de batimentos em tempo real." },
  { id: 3, name: "Genética Forense", icon: Dna, desc: "Mapeamento genético avançado." },
  { id: 4, name: "Ortopedia 3D", icon: Bone, desc: "Reconstrução óssea computadorizada." },
  { id: 5, name: "Pediatria", icon: Baby, desc: "Acompanhamento de desenvolvimento infantil." },
  { id: 6, name: "Oftalmologia", icon: Eye, desc: "Diagnóstico de retina por deep learning." },
  { id: 7, name: "Imunologia", icon: Virus, desc: "Prevenção de doenças infecciosas." },
  { id: 8, name: "Traumatologia", icon: Plus, desc: "Atendimento emergencial otimizado." },
  { id: 9, name: "Odontologia", icon: ChartLineUp, desc: "Escaneamento dental inteligente." },
];

export default function SpecialtiesContent() {
  return (
    <div className="specialties-container">
      <p className="specialties-intro">
        Nossa plataforma utiliza <strong>Inteligência Artificial</strong> para cruzar seus sintomas com milhares de dados clínicos, direcionando você ao especialista exato que precisa, no momento certo.
      </p>
      
      <div className="specialties-grid">
        {specialties.map(spec => (
          <div key={spec.id} className="specialty-card">
            <div className="specialty-icon-wrapper">
              <spec.icon size={32} weight="duotone" />
            </div>
            <h3 className="specialty-name">{spec.name}</h3>
            <p className="specialty-desc">{spec.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
