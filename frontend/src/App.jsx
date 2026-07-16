import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Header from './components/Header';
import Hero from './components/Hero';
import Specialties from './components/Specialties';
import Footer from './components/Footer';
import ChatModal from './components/ChatModal';
import ImmersiveSection from './components/ImmersiveSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useGSAP(() => {
    // ─── INITIAL STATES ───
    gsap.set(".header > *", { y: -20, opacity: 0 });
    gsap.set(".eyebrow", { y: 12, opacity: 0 });
    gsap.set(".title .word", { yPercent: 110, opacity: 0 });
    gsap.set(".title-desc", { opacity: 0, x: -10 });
    gsap.set(".paren-group .paren", { scale: 0, opacity: 0 });
    gsap.set(".avatar-group", { scale: 0, opacity: 0 });
    gsap.set(".dna-icon", { scale: 0, rotation: -45, opacity: 0 });
    gsap.set(".future-tag", { opacity: 0, x: -10 });
    gsap.set(".badge", { scale: 0, rotation: -90, opacity: 0 });
    gsap.set(".wave-wrap", { x: 120, opacity: 0 });
    gsap.set(".wave-glow", { opacity: 0 });
    gsap.set(".bg-text", { opacity: 0, scale: 1.1 });

    // ─── PAGE LOAD TIMELINE ───
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
    
    tl.to(".header > *", { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 })
      .to(".wave-glow", { opacity: 1, duration: 1.2 }, "-=.5")
      .to(".wave-wrap", { x: 0, opacity: 1, duration: 1.4, ease: "power3.out" }, "-=1.2")
      .to(".bg-text", { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }, "-=1.2")
      .to(".eyebrow", { y: 0, opacity: 1, duration: 0.5 }, "-=1")
      .to(".title .word", { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: "power4.out" }, "-=.8")
      .to(".title-desc", { x: 0, opacity: 1, duration: 0.6 }, "-=.5")
      .to(".paren-group .paren", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=.45")
      .to(".avatar-group", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.3")
      .to(".dna-icon", { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.4")
      .to(".future-tag", { x: 0, opacity: 1, duration: 0.5 }, "-=.3")
      .to(".badge", { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=.5");

    // ─── WAVE FLOAT ───
    gsap.to(".wave-wrap img", { y: -18, rotation: -1.2, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".wave-glow", { y: 12, scale: 1.05, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".wave-glow.b", { y: -16, x: -10, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    
    // Badge drift & Icons (removed y drift from badge to avoid scroll conflict)
    gsap.to(".dna-icon svg", { rotation: 12, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "50% 50%" });
    gsap.to(".avatar-group", { rotation: 3, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // ─── SCROLL PARALLAX ───
    gsap.to(".wave-wrap", {
      scrollTrigger: { trigger: "body", start: "top top", end: "+=1200", scrub: 1.2 },
      y: -240, rotation: 6, scale: 1.08
    });
    gsap.to(".bg-text", {
      scrollTrigger: { trigger: "body", start: "top top", end: "+=1000", scrub: 1.2 },
      xPercent: -8, opacity: 0.5
    });
    gsap.to(".badge", {
      scrollTrigger: { trigger: "body", start: "top top", end: "+=800", scrub: 1.5 },
      y: 80, rotation: 30
    });

  }, []);

  return (
    <div className="page">
      {/* ─── WAVE PNG + ATMOSPHERIC GLOW ─── */}
      <div className="wave-glow"></div>
      <div className="wave-glow b"></div>
      <div className="wave-wrap" id="wave">
        <img src="https://cdn.shopify.com/s/files/1/0185/5999/1872/files/blue_strand_transparent.png?v=1778949964" alt="Fluxo de dados azul" />
      </div>

      <div className="bg-text" aria-hidden="true">HIPÓCRATES</div>

      <Header onStart={() => setIsChatOpen(true)} />
      
      <Hero onStart={() => setIsChatOpen(true)} />

      <ImmersiveSection />

      <Specialties />

      <Footer />

      {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default App;
