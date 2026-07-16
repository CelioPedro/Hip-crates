import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import InteractiveBust from './InteractiveBust';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function ImmersiveSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const bustRef = useRef(null);

  useGSAP(() => {
    const titleText = "A Inteligência por trás do Cuidado";
    const descText = "Explore o nosso modelo preditivo interativo. Rotacione e veja como a IA analisa dados complexos em tempo real para conectar você ao especialista correto.";

    // Typing effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // Triggers when the top of the section hits the middle of the viewport
      }
    });

    tl.to(titleRef.current, {
      duration: 1.5,
      text: titleText,
      ease: "none"
    })
    .to(descRef.current, {
      duration: 2.5,
      text: descText,
      ease: "none"
    }, "+=0.2");

    // Hipo Scroll Coreography
    const hipoTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when section top hits viewport bottom
        end: "center center", // Ends when section center hits viewport center
        scrub: true,
      }
    });

    hipoTl.fromTo(bustRef.current, 
      { yPercent: -42 }, // yPercent is much safer against browser resize shifts than vh
      { yPercent: 0, ease: "none", force3D: true }
    );

  }, { scope: sectionRef, dependencies: [] });

  return (
    <section ref={sectionRef} className="immersive-section" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      margin: '25vh 0 60px',
    }}>
      
      {/* Text Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '500px',
        marginRight: 'auto',
        color: 'var(--text)'
      }}>
        <h2 ref={titleRef} style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, minHeight: '3.3rem' }}>
          
        </h2>
        <p ref={descRef} style={{ fontSize: '1.1rem', color: 'var(--text-2)', lineHeight: '1.5', minHeight: '5rem' }}>
          
        </p>
      </div>

      {/* GSAP Clean Wrapper: Prevents React from overwriting inline styles on re-render */}
      <div ref={bustRef} className="bust-anim-wrapper" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
        {/* 3D Bust Container */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '60%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'auto'
        }}>
          <InteractiveBust />
        </div>
      </div>
      
    </section>
  );
}
