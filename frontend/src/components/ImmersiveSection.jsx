import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import InteractiveBust from './InteractiveBust';
import { Dna, Heartbeat, Brain, Scan, ChartLineUp, DotsThree } from "@phosphor-icons/react";
import { FacebookLogo, TwitterLogo, InstagramLogo } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function ImmersiveSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const bustRef = useRef(null);
  const textWrapperRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const doctorClusterRef = useRef(null);
  const socialRef = useRef(null);

  const bustState = useRef({ phase: "START", simulatedX: 0, simulatedY: 0 });

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
    }
  ];

  useGSAP(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 1. Typing effect timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Trigger exactly when the section is fully framed and pinned
      },
      onStart: () => {
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
      },
      onComplete: () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        if (bustState.current) bustState.current.phase = "DONE"; 
      }
    });

    const titleChars = titleRef.current.querySelectorAll('.anim-char');
    const descChars = descRef.current.querySelectorAll('.anim-char');

    gsap.set([titleChars, descChars], { opacity: 0, y: 15, filter: "blur(4px)" });

    const trackReading = function() {
      bustState.current.phase = "READING"; 
      const el = this.targets()[0];
      if (el && el.getBoundingClientRect) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) {
          let nx = (rect.left + rect.width / 2) / window.innerWidth * 2 - 1;
          let ny = -(rect.top + rect.height / 2) / window.innerHeight * 2 + 1;
          nx = Math.max(-0.6, Math.min(0.6, nx));
          ny = Math.max(-0.6, Math.min(0.6, ny));
          bustState.current.simulatedX = nx;
          bustState.current.simulatedY = ny;
        }
      }
    };

    tl.to(titleChars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8, 
      ease: "power2.out",
      stagger: {
        each: 0.05, 
        onStart: trackReading
      }
    })
    .to(descChars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8, 
      ease: "power2.out",
      stagger: {
        each: 0.05, 
        onStart: trackReading
      }
    });

    // 2. Hipo Scroll Coreography (Descent)
    const hipoTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "top top", // Finishes exact at the pin point
        scrub: true,
      }
    });

    hipoTl.fromTo(bustRef.current, 
      { yPercent: -42 }, 
      { yPercent: 0, ease: "sine.inOut", force3D: true } 
    );

    // 2.5 Pin the giant background text simultaneously so it doesn't scroll away!
    const bgTextElement = document.querySelector('.bg-text-wrapper');
    if (bgTextElement) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2500",
        pin: bgTextElement,
        pinSpacing: false // Prevent this pin from artificially extending the page height further!
      });
    }

    // 3. Master Pinned Timeline (Multi-stage Reveal Sequence)
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Pins when section reaches top of viewport
        end: "+=2500", // Increased to 2500px to accommodate all 4 phases of the story
        pin: true,
        scrub: 1.5,
      }
    });

    const cards = cardsWrapperRef.current.querySelectorAll('.treatment');
    const doctorCards = doctorClusterRef.current.querySelectorAll('.clay-card');
    
    // Set initial states
    gsap.set(cards, { opacity: 0, x: -40, filter: "blur(4px)" });
    gsap.set(doctorCards, { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" });

    pinTl
      // PHASE 1: Pause slightly at the beginning
      .to({}, { duration: 0.15 })
      
      // PHASE 2: Fade out introductory text
      .to(textWrapperRef.current, {
        opacity: 0,
        y: -30,
        filter: "blur(8px)",
        duration: 1,
        ease: "power2.inOut"
      })
      
      // PHASE 3: Fade in specialty cards
      .to(cards, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.6")
      
      // Keep cards on screen for a moment while scrolling
      .to({}, { duration: 0.5 })
      
      // PHASE 4: Fade out specialty cards
      .to(cards, {
        opacity: 0,
        x: -40,
        filter: "blur(4px)",
        duration: 1,
        stagger: 0.1,
        ease: "power2.in"
      })
      .set(cardsWrapperRef.current, { pointerEvents: "none" }) // Disable interaction when hidden
      
      // PHASE 5: Fade in Doctor & Info cluster
      .to(doctorCards, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.2)"
      }, "-=0.4")
      
      // Phase 5b: Fade in Social Icons
      .fromTo(socialRef.current.querySelectorAll('.social-btn'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.8"
      )
      
      // Enable interaction for the final phase
      .set(doctorClusterRef.current, { pointerEvents: "auto" })
      .set(socialRef.current, { pointerEvents: "auto" });

  }, { scope: sectionRef, dependencies: [] });

  return (
    <>
      <div style={{ height: '25vh' }}></div>
      <section ref={sectionRef} className="immersive-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
      
      {/* Content Container (Left Side) */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '500px', marginRight: 'auto', minHeight: '300px' }}>
        
        {/* Text Content */}
        <div ref={textWrapperRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', color: 'var(--text)' }}>
          <h2 ref={titleRef} style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, minHeight: '3.3rem' }}>
            {"A Inteligência por trás do Cuidado".split(" ").map((word, wIndex) => (
              <span key={wIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
                {word.split("").map((char, cIndex) => (
                  <span key={`${wIndex}-${cIndex}`} className="anim-char" style={{ display: 'inline-block' }}>{char}</span>
                ))}
              </span>
            ))}
          </h2>
          <p ref={descRef} style={{ fontSize: '1.1rem', color: 'var(--text-2)', lineHeight: '1.5', minHeight: '5rem' }}>
            {"Explore o nosso modelo preditivo interativo. Rotacione e veja como a IA analisa dados complexos em tempo real para conectar você ao especialista correto.".split(" ").map((word, wIndex) => (
              <span key={wIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
                {word.split("").map((char, cIndex) => (
                  <span key={`${wIndex}-${cIndex}`} className="anim-char" style={{ display: 'inline-block' }}>{char}</span>
                ))}
              </span>
            ))}
          </p>
        </div>

        {/* Cards Content */}
        <div ref={cardsWrapperRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', pointerEvents: 'none' }}>
          <div className="treatments">
            {specialties.map((item, index) => (
              <article className="clay-card treatment" key={index} style={{ marginBottom: index !== 2 ? '14px' : '0' }}>
                <div className="head">
                  <span className="icon" aria-hidden="true">{item.icon}</span>
                  <h3 style={{ fontSize: '15px' }}>{item.title}</h3>
                  <button className="menu-dots" aria-label="Mais"><DotsThree weight="bold" /></button>
                </div>
                <p style={{ fontSize: '14px', margin: '4px 0 0 0' }}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Doctor & Info Cluster */}
        <div ref={doctorClusterRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', pointerEvents: 'none' }}>
          <div className="doctor-cluster" style={{ marginTop: 0 }}>
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
        </div>

        {/* Social Icons */}
        <div ref={socialRef} style={{ position: 'absolute', bottom: '-40px', left: 0, pointerEvents: 'none' }}>
          <div className="social">
            <a href="#" className="social-btn" aria-label="Twitter">
              <TwitterLogo weight="fill" size={20} />
            </a>
            <a href="#" className="social-btn" aria-label="Facebook">
              <FacebookLogo weight="fill" size={20} />
            </a>
            <a href="#" className="social-btn" aria-label="Instagram">
              <InstagramLogo weight="regular" size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* GSAP Clean Wrapper */}
      <div ref={bustRef} className="bust-anim-wrapper" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '60%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'auto'
        }}>
          <InteractiveBust bustState={bustState} />
        </div>
      </div>
      
      </section>
    </>
  );
}
