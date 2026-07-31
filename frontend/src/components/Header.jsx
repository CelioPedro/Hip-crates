import { Plus, CaretRight, ArrowRight, House, Article, Heartbeat } from "@phosphor-icons/react";

export default function Header({ onStart, onOpenModal }) {
  return (
    <header className="header" role="banner">
      <a className="logo" href="#" aria-label="Hipócrates Home">
        <img src="/Logo01.svg" alt="Hipócrates Logo" style={{ height: '60px', width: 'auto' }} />
      </a>

      <nav className="nav-pills" aria-label="Primary">
        <a className="nav-pill active" href="#">
          <House weight="bold" />
          Início
        </a>
        <button className="nav-pill" onClick={() => onOpenModal('specialties')}>
          <Heartbeat weight="bold" />
          Especialidades
        </button>
        <button className="nav-pill" onClick={() => onOpenModal('about')}>
          <Article weight="bold" />
          Sobre
        </button>
      </nav>

      <button className="header-cta" aria-label="Iniciar Triagem" onClick={onStart}>
        <span className="cta-text">Iniciar Triagem</span>
        <span className="cta-dot">
          <ArrowRight weight="bold" />
        </span>
      </button>
    </header>
  );
}
