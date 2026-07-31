import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import InteractiveBust from './InteractiveBust';
import GlassModal from './GlassModal';
import FeatureModalContent from './FeatureModalContent';
import { ArrowCircleRight, DotsThree, TwitterLogo, FacebookLogo, InstagramLogo, Scan, ChartLineUp, Dna, Heartbeat, CaretUp, CaretDown } from "@phosphor-icons/react";
import './MarqueeList.css';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function ImmersiveSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const bustRef = useRef(null);
  const textWrapperRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const doctorClusterRef = useRef(null);
  const teamClusterRef = useRef(null);
  const socialRef = useRef(null);
  const lenis = useLenis();
  const lenisInstanceRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [canScrollTop, setCanScrollTop] = useState(false);
  const [canScrollBottom, setCanScrollBottom] = useState(true);
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);

  const handleMarqueeScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setCanScrollTop(scrollTop > 0);
    setCanScrollBottom(Math.ceil(scrollTop + clientHeight) < scrollHeight);

    // Disable hover states while scrolling to prevent chaotic jumping
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  // Always keep the latest lenis instance in a ref to avoid stale closures in useGSAP
  useEffect(() => {
    lenisInstanceRef.current = lenis;
  }, [lenis]);

  const bustState = useRef({ phase: "START", simulatedX: 0, simulatedY: 0 });

  const specialties = [
    {
      title: "Genética e Medicina Personalizada",
      desc: "Planos de tratamento baseados no genoma do paciente.",
      icon: <Dna size={24} weight="duotone" />,
      featureKey: "genetics"
    },
    {
      title: "Radiologia e Diagnóstico",
      desc: "Análise avançada de imagem com precisão algorítmica.",
      icon: <Scan size={24} weight="duotone" />,
      featureKey: "radiology"
    },
    {
      title: "Oncologia de Precisão",
      desc: "Imunoterapia e tratamentos guiados por biologia molecular.",
      icon: <Heartbeat size={24} weight="duotone" />,
      featureKey: "oncology"
    }
  ];

  useGSAP(() => {
    // 1. Typing effect timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Trigger exactly when the section is fully framed and pinned
      },
      onStart: () => {
        // Stop smooth scrolling while the typing effect happens
        if (lenisInstanceRef.current) lenisInstanceRef.current.stop();
      },
      onComplete: () => {
        // Resume smooth scrolling
        if (lenisInstanceRef.current) lenisInstanceRef.current.start();
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
        start: "top top",
        end: "+=600%", // Extends pin duration
        pin: true,
        scrub: 1,
      }
    });

    const cards = cardsWrapperRef.current.querySelectorAll('.treatment');
    const doctorCards = doctorClusterRef.current.querySelectorAll('.doctor-card, .info-card');
    const marqueeList = teamClusterRef.current.querySelector('.marquee-list');
    
    // Set initial states
    gsap.set([cardsWrapperRef.current, doctorClusterRef.current, teamClusterRef.current], { autoAlpha: 0 });
    gsap.set(cards, { x: -40, filter: "blur(4px)" });
    gsap.set(doctorCards, { scale: 0.9, y: 30, filter: "blur(8px)" });
    gsap.set(marqueeList, { autoAlpha: 0 }); // Hide the white background initially

    pinTl
      // PHASE 1: Pause slightly at the beginning
      .to({}, { duration: 0.15 })
      
      // PHASE 2: Fade out introductory text
      .to(textWrapperRef.current, {
        autoAlpha: 0,
        y: -30,
        filter: "blur(8px)",
        duration: 1,
        ease: "power2.inOut"
      })
      
      // PHASE 3: Fade in specialty cards
      .to(cardsWrapperRef.current, { autoAlpha: 1, duration: 0.1 }, "-=0.6")
      .to(cards, {
        autoAlpha: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.5")
      
      // Keep cards on screen for a moment while scrolling
      .to({}, { duration: 0.5 })
      
      // PHASE 4: Fade out specialty cards
      .to(cards, {
        autoAlpha: 0,
        x: -40,
        filter: "blur(4px)",
        duration: 1,
        stagger: 0.1,
        ease: "power2.in"
      })
      .to(cardsWrapperRef.current, { autoAlpha: 0, duration: 0.1 })
      
      // PHASE 5: Fade in Doctor & Info cluster
      .to(doctorClusterRef.current, { autoAlpha: 1, duration: 0.1 }, "-=0.4")
      .to(doctorCards, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.2)"
      }, "-=0.3")
      
      // Phase 5b: Fade in Social Icons
      .fromTo(socialRef.current.querySelectorAll('.social-btn'),
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.8"
      )
      
      // PHASE 6: Fade out Doctor & Info cluster
      .to({}, { duration: 0.5 }) // Wait before fading out
      .to([doctorCards, socialRef.current.querySelectorAll('.social-btn')], {
        autoAlpha: 0,
        y: -30,
        filter: "blur(8px)",
        duration: 1,
        stagger: 0.05,
        ease: "power2.in"
      })
      .to(doctorClusterRef.current, { autoAlpha: 0, duration: 0.1 })

      // PHASE 7: Appear Team Marquee Cluster instantly to avoid scroll hijacking conflicts
      .to(teamClusterRef.current, { autoAlpha: 1, duration: 0.1 })
      .set(teamClusterRef.current.querySelectorAll('.marquee-item'), {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)"
      })
      .set(teamClusterRef.current.querySelector('.marquee-list'), {
        autoAlpha: 1
      })
      .set(teamClusterRef.current.querySelectorAll('.marquee-indicator'), {
        opacity: 0.6 // Indicator opacity is handled manually by React styles
      })
      // Add buffer so the section remains pinned for a bit while they interact with the marquee
      .to({}, { duration: 1.5 });

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
        <div ref={cardsWrapperRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%' }}>
          <div className="treatments">
            {specialties.map((item, index) => (
              <article 
                className="clay-card treatment" 
                key={index} 
                style={{ marginBottom: index !== 2 ? '14px' : '0', cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                onClick={(e) => {
                  console.log("Card clicado!", item.featureKey);
                  setActiveFeatureModal(item.featureKey);
                }}
              >
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

        {/* Doctor & Info Cluster (CEO / Diretor) */}
        <div ref={doctorClusterRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%' }}>
          <div className="doctor-cluster" style={{ marginTop: 0 }}>
            <div className="clay-card doctor-card">
              <div className="doctor-avatar" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150" alt="Médica" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="doctor-meta">
                <div className="name">Dra. Sarah Johnson</div>
                <div className="role">Diretoria Médica</div>
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

        {/* Team Cluster (Phase 7) - Marquee Hover UI */}
        <div ref={teamClusterRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%' }}>
          
          <div 
            className="marquee-scroll-area" 
            data-lenis-prevent="true"
            onScroll={handleMarqueeScroll}
            style={{
              WebkitMaskImage: canScrollTop && canScrollBottom 
                ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                : canScrollTop 
                  ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                  : canScrollBottom 
                    ? 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    : 'none',
              maskImage: canScrollTop && canScrollBottom 
                ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                : canScrollTop 
                  ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                  : canScrollBottom 
                    ? 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    : 'none',
              transition: 'mask-image 0.3s ease, -webkit-mask-image 0.3s ease'
            }}
          >
            <div className="marquee-wrapper" style={{ pointerEvents: isScrolling ? 'none' : 'auto' }}>
              {/* The static list items that act as hover triggers */}
              {[
                { name: "Dra. Sarah Johnson", specialty: "Neurologia", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dr. Michael Chen", specialty: "Oncologia", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dra. Elena Rodriguez", specialty: "Genética Forense", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dr. Arthur Lima", specialty: "Cardiologia IA", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dra. Letícia Costa", specialty: "Pediatria", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dr. Roberto Silva", specialty: "Ortopedia 3D", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dra. Camila Nunes", specialty: "Dermatologia", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dr. Lucas Martins", specialty: "Psiquiatria", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dra. Juliana Prado", specialty: "Nutrologia", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dr. Marcos Rocha", specialty: "Fisioterapia", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dra. Beatriz Santos", specialty: "Oftalmologia", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                { name: "Dr. Tiago Mendes", specialty: "Urologia", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" }
              ].map((doc, i) => (
                <div 
                  className="marquee-item" 
                  key={i} 
                  style={{ 
                    opacity: 0, 
                    transform: 'translateY(20px)', 
                    filter: 'blur(4px)',
                    transition: 'opacity 1.5s ease, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1.5s ease'
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {doc.name}
                </div>
              ))}

              {/* The hidden marquee container that masks rows based on the hovered item */}
              <div 
                className="marquee-horizontal-mask"
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
                  WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10% 90%, transparent)',
                  maskImage: 'linear-gradient(90deg, transparent, #000 10% 90%, transparent)'
                }}
              >
                <div className="marquee-list" style={{
                  transition: 'opacity 1.5s ease, mask-position 0.4s ease, -webkit-mask-position 0.4s ease',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15px, black 50px, transparent 100%)',
                  WebkitMaskSize: '100% 65px',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: `0px calc(${activeIndex} * 65px)`,
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15px, black 50px, transparent 100%)',
                  maskSize: '100% 65px',
                  maskRepeat: 'no-repeat',
                  maskPosition: `0px calc(${activeIndex} * 65px)`,
                }}>
                  {[
                    { name: "Dra. Sarah Johnson", specialty: "Neurologia", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dr. Michael Chen", specialty: "Oncologia", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dra. Elena Rodriguez", specialty: "Genética Forense", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dr. Arthur Lima", specialty: "Cardiologia IA", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dra. Letícia Costa", specialty: "Pediatria", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dr. Roberto Silva", specialty: "Ortopedia 3D", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dra. Camila Nunes", specialty: "Dermatologia", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dr. Lucas Martins", specialty: "Psiquiatria", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dra. Juliana Prado", specialty: "Nutrologia", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dr. Marcos Rocha", specialty: "Fisioterapia", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dra. Beatriz Santos", specialty: "Oftalmologia", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" },
                    { name: "Dr. Tiago Mendes", specialty: "Urologia", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=3&q=80&w=150&h=150" }
                  ].map((doc, i) => (
                  <div className="marquee-row" key={i}>
                    <div className="marquee-inner">
                      <span>{doc.name}</span>
                      <img src={doc.img} alt={doc.name} />
                      <span>{doc.specialty}</span>
                      <img src={doc.img} alt={doc.name} />
                      <span>{doc.name}</span>
                      <img src={doc.img} alt={doc.name} />
                      <span>{doc.specialty}</span>
                      <img src={doc.img} alt={doc.name} />
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
          
          {/* Subtle scroll indicator TOP */}
          <div className={`marquee-indicator ${!canScrollTop ? 'hidden' : ''}`} style={{
            position: 'absolute',
            top: '-25px', 
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            opacity: 0, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <CaretUp size={18} color="var(--text-2)" style={{ animation: 'subtleBounce 2s infinite ease-in-out' }} />
          </div>

          {/* Subtle scroll indicator BOTTOM */}
          <div className={`marquee-indicator ${!canScrollBottom ? 'hidden' : ''}`} style={{
            position: 'absolute',
            bottom: '-25px', 
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            opacity: 0, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <style>
              {`
                @keyframes subtleBounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(5px); }
                }
                .marquee-indicator { transition: opacity 1.5s ease !important; }
                .marquee-indicator.hidden { opacity: 0 !important; }
              `}
            </style>
            <CaretDown size={18} color="var(--text-2)" style={{ animation: 'subtleBounce 2s infinite ease-in-out' }} />
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

      <GlassModal 
        isOpen={!!activeFeatureModal} 
        onClose={() => setActiveFeatureModal(null)} 
        title={activeFeatureModal ? specialties.find(s => s.featureKey === activeFeatureModal)?.title : ''}
      >
        <FeatureModalContent featureKey={activeFeatureModal} />
      </GlassModal>
    </>
  );
}
