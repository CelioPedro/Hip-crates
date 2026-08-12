import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import { ArrowDown } from "@phosphor-icons/react";

import Header from './components/Header';
import Hero from './components/Hero';
import ChatModal from './components/ChatModal';
import ImmersiveSection from './components/ImmersiveSection';
import GlassModal from './components/GlassModal';
import SpecialtiesContent from './components/SpecialtiesContent';
import AboutContent from './components/AboutContent';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const lenisRef = useRef(null);

  // Sync GSAP ticker with Lenis
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Very important for Lenis!
    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 801px)", () => {
      // ─── DESKTOP ANIMATIONS ───
      gsap.set(".header > *", { y: -20, opacity: 0 });
      gsap.set(".eyebrow.desktop-only", { y: 12, opacity: 0 });
      gsap.set(".title.desktop-only .word", { yPercent: 110, opacity: 0 });
      gsap.set(".title.desktop-only .title-desc", { opacity: 0, x: -10 });
      gsap.set(".title.desktop-only .paren-group .paren", { scale: 0, opacity: 0 });
      gsap.set(".title.desktop-only .avatar-group", { scale: 0, opacity: 0 });
      gsap.set(".title.desktop-only .dna-icon", { scale: 0, rotation: -45, opacity: 0 });
      gsap.set(".title.desktop-only .future-tag", { opacity: 0, x: -10 });
      gsap.set(".badge.desktop-only", { scale: 0, rotation: -90, opacity: 0 });
      gsap.set(".wave-wrap", { x: 120, opacity: 0 });
      gsap.set(".wave-glow", { opacity: 0 });
      gsap.set(".bg-text", { opacity: 0, scale: 1.1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
      tl.to(".header > *", { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 })
        .to(".wave-glow", { opacity: 1, duration: 1.2 }, "-=.5")
        .to(".wave-wrap", { x: 0, opacity: 1, duration: 1.4, ease: "power3.out" }, "-=1.2")
        .to(".bg-text", { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }, "-=1.2")
        .to(".eyebrow.desktop-only", { y: 0, opacity: 1, duration: 0.5 }, "-=1")
        .to(".title.desktop-only .word", { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: "power4.out" }, "-=.8")
        .to(".title.desktop-only .title-desc", { x: 0, opacity: 1, duration: 0.6 }, "-=.5")
        .to(".title.desktop-only .paren-group .paren", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=.45")
        .to(".title.desktop-only .avatar-group", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.3")
        .to(".title.desktop-only .dna-icon", { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.4")
        .to(".title.desktop-only .future-tag", { x: 0, opacity: 1, duration: 0.5 }, "-=.3")
        .to(".badge.desktop-only", { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=.5");

      gsap.to(".wave-wrap", { scrollTrigger: { trigger: "body", start: "top top", end: "+=1200", scrub: 1.2 }, y: -240, rotation: 6, scale: 1.08 });
      gsap.to(".bg-text", { scrollTrigger: { trigger: "body", start: "top top", end: "+=1000", scrub: 1.2 }, xPercent: -8, opacity: 0.5 });
      gsap.to(".badge.desktop-only", { scrollTrigger: { trigger: "body", start: "top top", end: "+=800", scrub: 1.5 }, y: 80 });
    });

    mm.add("(max-width: 800px)", () => {
      // ─── MOBILE ANIMATIONS ───
      gsap.set(".header > *", { y: -10, opacity: 0 }); 
      gsap.set(".mobile-hero-layout .eyebrow", { y: 12, opacity: 0 });
      gsap.set(".mobile-hero-layout .title .word", { yPercent: 110, opacity: 0 });
      gsap.set(".mobile-hero-layout .title-desc", { opacity: 0, x: -10 });
      gsap.set(".mobile-hero-layout .paren-group .paren", { scale: 0, opacity: 0 });
      gsap.set(".mobile-hero-layout .avatar-group", { scale: 0, opacity: 0 });
      gsap.set(".mobile-hero-layout .dna-icon", { scale: 0, rotation: -45, opacity: 0 });
      gsap.set(".mobile-hero-layout .future-tag", { opacity: 0, x: -10 });
      gsap.set(".mobile-hero-layout .mobile-badge", { scale: 0, rotation: -90, opacity: 0 });
      gsap.set(".wave-wrap", { x: 60, opacity: 0 }); 
      gsap.set(".wave-glow", { opacity: 0 });
      gsap.set(".bg-text", { opacity: 0, scale: 1.02 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
      tl.to(".header > *", { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 })
        .to(".wave-glow", { opacity: 1, duration: 1 }, "-=.4")
        .to(".wave-wrap", { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=.8")
        .to(".bg-text", { opacity: 0.5, scale: 1, duration: 1 }, "-=.8")
        .to(".mobile-hero-layout .title .word", { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power4.out" }, "-=.6")
        .to(".mobile-hero-layout .paren-group .paren", { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, "-=.5")
        .to(".mobile-hero-layout .avatar-group", { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=.3")
        .to(".mobile-hero-layout .dna-icon", { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=.4")
        .to(".mobile-hero-layout .title-desc", { x: 0, opacity: 1, duration: 0.5 }, "-=.3")
        .to(".mobile-hero-layout .mobile-badge", { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.2")
        .to(".mobile-hero-layout .eyebrow", { y: 0, opacity: 1, duration: 0.5 }, "-=.4")
        .to(".mobile-hero-layout .future-tag", { x: 0, opacity: 1, duration: 0.4 }, "-=.3");

      gsap.to(".wave-wrap", { scrollTrigger: { trigger: "body", start: "top top", end: "+=800", scrub: 1 }, y: -80, rotation: 20 });
      gsap.to(".bg-text", { scrollTrigger: { trigger: "body", start: "top top", end: "+=600", scrub: 1 }, y: 50 });
      gsap.to(".mobile-hero-layout .mobile-badge", { scrollTrigger: { trigger: "body", start: "top top", end: "+=600", scrub: 1 }, y: 40 });
    });

    // Global scroll badge visibility (appears from second section onwards)
    gsap.to(".global-scroll-badge", {
      scrollTrigger: {
        trigger: ".immersive-section",
        start: "top center", // appears when the second section reaches the middle of the screen
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.5)"
    });

  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      <div className="page">
        {/* ─── WAVE PNG + ATMOSPHERIC GLOW ─── */}
        <div className="wave-glow"></div>
        <div className="wave-glow b"></div>
        <div className="wave-wrap" id="wave">
          <img src="https://cdn.shopify.com/s/files/1/0185/5999/1872/files/blue_strand_transparent.png?v=1778949964" alt="Fluxo de dados azul" />
        </div>

        <div className="bg-text-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <div className="bg-text" aria-hidden="true">HIPÓCRATES</div>
        </div>

        <Header 
          onStart={() => setIsChatOpen(true)} 
          onOpenModal={(modalName) => setActiveModal(modalName)}
        />
        
        <Hero onStart={() => setIsChatOpen(true)} />

        <ImmersiveSection 
          onStart={() => setIsChatOpen(true)} 
          onOpenModal={(modalName) => setActiveModal(modalName)}
        />

        {/* ─── GLOBAL SCROLL INDICATOR ─── */}
        <div className="global-scroll-badge" aria-hidden="true">
          <svg className="ring" viewBox="0 0 100 100">
            <defs>
              <path id="global-badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
            </defs>
            <text fontFamily="Inter Tight, sans-serif" fontSize="9.5" fontWeight="500" fill="#666" letterSpacing="2.4">
              <textPath href="#global-badge-path">Role · Explore · Descubra · </textPath>
            </text>
          </svg>
          <span className="badge-center">
            <ArrowDown weight="bold" size={18} color="#080808" />
          </span>
        </div>

        {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
        
        <GlassModal 
          isOpen={activeModal === 'specialties'} 
          onClose={() => setActiveModal(null)} 
          title="Especialidades Hipócrates"
        >
          <SpecialtiesContent />
        </GlassModal>

        <GlassModal 
          isOpen={activeModal === 'about'} 
          onClose={() => setActiveModal(null)} 
          title="Sobre o Hipócrates"
        >
          <AboutContent />
        </GlassModal>
      </div>
    </ReactLenis>
  );
}

export default App;
