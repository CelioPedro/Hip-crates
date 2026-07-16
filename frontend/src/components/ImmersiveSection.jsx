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

  const bustState = useRef({ phase: "START", simulatedX: 0, simulatedY: 0 });

  useGSAP(() => {
    // Typing effect timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 35%", // Much later trigger: waits until the section is pushed high up in the viewport
      }
    });

    const titleChars = titleRef.current.querySelectorAll('.anim-char');
    const descChars = descRef.current.querySelectorAll('.anim-char');
    const allChars = [...titleChars, ...descChars];

    gsap.set(allChars, { opacity: 0, y: 15, filter: "blur(4px)" });

    tl.to(allChars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.8, // Slower reveal per letter for a much more elegant pace
      ease: "power2.out",
      stagger: {
        each: 0.05, // Slower stagger time to match the longer duration
        onStart: function() {
          bustState.current.phase = "READING"; // Lock gaze to the text being read
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
        }
      },
      onComplete: () => {
        if (bustState.current) bustState.current.phase = "DONE"; // Free the mouse
      }
    });

    // Hipo Scroll Coreography
    const hipoTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "center center", 
        scrub: true,
      }
    });

    hipoTl.fromTo(bustRef.current, 
      { yPercent: -42 }, // Restored to your original correct height
      { yPercent: 0, ease: "sine.inOut", force3D: true } // Symmetrical, gentle ease prevents aggressive initial acceleration
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

      {/* GSAP Clean Wrapper: Prevents React from overwriting inline styles on re-render */}
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
  );
}
