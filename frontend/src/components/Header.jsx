import { Plus, CaretRight, ArrowRight, House, Article, Heartbeat } from "@phosphor-icons/react";

export default function Header({ onStart }) {
  return (
    <header className="header" role="banner">
      <a className="logo" href="#" aria-label="Hipócrates Home">
        <img src="/Logo01.svg" alt="Hipócrates Logo" style={{ height: '65px', width: 'auto' }} />
      </a>

      <nav className="nav-pills" aria-label="Primary">
        <a className="nav-pill active" href="#">
          <House weight="bold" />
          Início
        </a>
        <a className="nav-pill" href="#">
          <Heartbeat weight="bold" />
          Especialidades
        </a>
        <a className="nav-pill" href="#">
          <Article weight="bold" />
          Sobre
        </a>
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
