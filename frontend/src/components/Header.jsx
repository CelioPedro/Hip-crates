import { useState } from 'react';
import { Plus, CaretRight, ArrowRight, House, Article, Heartbeat, List, X } from "@phosphor-icons/react";

export default function Header({ onStart, onOpenModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="header" role="banner">
        <a className="logo" href="#" aria-label="Hipócrates Home">
          <img src={`${import.meta.env.BASE_URL}Logo01.svg`} alt="Hipócrates Logo" style={{ height: '60px', width: 'auto' }} />
        </a>

        {/* Desktop Nav */}
        <nav className="nav-pills desktop-nav" aria-label="Primary">
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

        {/* Desktop & Mobile CTA (handled by CSS) */}
        <button className="header-cta" aria-label="Iniciar Triagem" onClick={onStart}>
          <span className="cta-text">Iniciar Triagem</span>
          <span className="cta-dot">
            <ArrowRight weight="bold" />
          </span>
        </button>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Alternar menu"
        >
          {isMobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a className="mobile-nav-link" href="#" onClick={() => setIsMobileMenuOpen(false)}>
            <House weight="bold" size={24} /> Início
          </a>
          <button className="mobile-nav-link" onClick={() => { onOpenModal('specialties'); setIsMobileMenuOpen(false); }}>
            <Heartbeat weight="bold" size={24} /> Especialidades
          </button>
          <button className="mobile-nav-link" onClick={() => { onOpenModal('about'); setIsMobileMenuOpen(false); }}>
            <Article weight="bold" size={24} /> Sobre
          </button>
          <button className="header-cta mobile-cta" aria-label="Iniciar Triagem" onClick={() => { onStart(); setIsMobileMenuOpen(false); }}>
            <span className="cta-text">Iniciar Triagem</span>
            <span className="cta-dot"><ArrowRight weight="bold" /></span>
          </button>
        </nav>
      </div>
    </>
  );
}
