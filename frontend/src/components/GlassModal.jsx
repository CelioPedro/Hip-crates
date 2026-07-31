import React, { useEffect, useState } from 'react';
import { X } from "@phosphor-icons/react";
import './GlassModal.css';

export default function GlassModal({ isOpen, onClose, title, children }) {
  const [shouldRender, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const onAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
        <filter id="liquid-glass">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </svg>
      <div 
        className={`glass-modal-overlay ${isOpen ? 'open' : 'closed'}`} 
        onClick={onClose} 
        onAnimationEnd={onAnimationEnd}
        aria-modal="true" 
        role="dialog"
      >
        <div 
          className="glass-modal-content" 
          onClick={(e) => e.stopPropagation()}
        >
        <div className="glass-modal-header">
          <h2 className="glass-modal-title">{title}</h2>
          <button className="glass-modal-close" onClick={onClose} aria-label="Fechar modal">
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="glass-modal-body" data-lenis-prevent="true">
          {children}
        </div>
      </div>
    </div>
    </>
  );
}
